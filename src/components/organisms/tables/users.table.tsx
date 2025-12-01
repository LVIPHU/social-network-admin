import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { EllipsisVertical } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { DataTable } from '@/components/molecules/data-table'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header.tsx'
import { DataTableFooter } from '@/components/molecules/data-table/data-table-footer.tsx'
import { DataTableHeader } from '@/components/molecules/data-table/data-table-header.tsx'
import { DataTableSkeleton } from '@/components/molecules/data-table/data-table-skeleton.tsx'
import type { FilterConfig } from '@/components/molecules/data-table/data-table.types'
import { dragColumn } from '@/components/molecules/data-table/drag-column.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { useTableSelection } from '@/hooks/use-table-selection'
import type { UserDto } from '@/packages/models/user/user.model.ts'
import { useTableColumns } from '@/packages/utils/table-columns.ts'

type UsersTableProps = {
  data: Array<UserDto>
  loading: boolean
  selectedRows: Array<string>
  onRowSelect: (userIds: Array<string>) => void
  search: string
  onSearch: (keyword: string) => void
  filters?: Array<FilterConfig>
  filterValues?: Record<string, Array<string>>
  onFilterChange?: (filters: Record<string, Array<string>>) => void
  pagination: {
    page: number
    limit: number
    total_pages: number
    total_rows: number
  }
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const defaultColumnIds = ['user_id', 'username', 'name', 'status', 'created_at']

export function UsersTable({
  data,
  loading,
  onRowSelect,
  search,
  onSearch,
  filters,
  filterValues = {},
  onFilterChange,
  pagination,
  onPageChange,
  onPageSizeChange,
}: UsersTableProps) {
  const [localData, setLocalData] = useState<Array<UserDto & { id: string }>>(
    [],
  )

  const { columnStates, visibleColumns, columnOrder, updateColumnOrder } =
    useTableColumns('users', defaultColumnIds)

  // Update local data when data prop changes
  useEffect(() => {
    const dataWithId = data.map((user) => ({
      ...user,
      id: user.user_id,
    }))
    setLocalData(dataWithId)
  }, [data])

  // Define all columns
  const allColumns = useMemo<Array<ColumnDef<UserDto & { id: string }>>>(
    () => [
      {
        ...(dragColumn as ColumnDef<UserDto & { id: string }>),
      },
      {
        id: 'select',
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(Boolean(value))
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: 'user_id',
        accessorKey: 'user_id',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User ID" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">
            {row.getValue('user_id')}
          </div>
        ),
      },
      {
        id: 'username',
        accessorKey: 'username',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Username" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[150px] truncate">
            {row.getValue('username')}
          </div>
        ),
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">{row.getValue('name')}</div>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: () => {
          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              N/A
            </Badge>
          )
        },
      },
      {
        id: 'created_at',
        accessorKey: 'created_at',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
          const date = row.getValue('created_at')
          return date && date instanceof Date ? (
            <div className="max-w-[150px]">
              {dayjs(date).format('MMM DD, YYYY')}
            </div>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )
        },
      },
      {
        id: 'actions',
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <EllipsisVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Make a copy</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  )

  // Apply column order and visibility
  const orderedColumns = useMemo(() => {
    const columnMap = new Map(allColumns.map((col) => [col.id!, col]))
    const ordered: Array<ColumnDef<UserDto & { id: string }>> = []

    // Add drag column first
    const dragCol = columnMap.get('drag')
    if (dragCol) ordered.push(dragCol)

    // Add select column second
    const selectCol = columnMap.get('select')
    if (selectCol) ordered.push(selectCol)

    // Add columns in order from localStorage
    columnOrder.forEach((colId) => {
      const col = columnMap.get(colId)
      if (col && visibleColumns.includes(colId)) {
        ordered.push(col)
      }
    })

    // Add actions column last
    const actionsCol = columnMap.get('actions')
    if (actionsCol) ordered.push(actionsCol)

    return ordered
  }, [allColumns, columnOrder, visibleColumns])

  // Handle drag end to update data order
  const handleReorder = useCallback(
    (newData: Array<UserDto & { id: string }>) => {
      setLocalData(newData)
      // Optionally: Call API to save the new order
      // await updateUsersOrder(newData.map(item => item.user_id))
    },
    [],
  )

  const table = useReactTable<UserDto & { id: string }>({
    data: localData,
    columns: orderedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: pagination.total_pages,
    getRowId: (row) => row.id,
    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      },
    },
  })

  // Use table selection hook
  const { rowSelection, selectedRows } = useTableSelection(
    table,
    (row) => row.user_id,
    {
      onSelectionChange: (ids) => {
        onRowSelect(ids)
      },
    },
  )

  // Update table state with rowSelection from hook
  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        rowSelection,
      },
    }))
  }, [table, rowSelection])

  if (loading) {
    return <DataTableSkeleton columns={orderedColumns.length} />
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <DataTableHeader
        search={search}
        onSearch={onSearch}
        filters={filters}
        filterValues={filterValues}
        onFilterChange={onFilterChange}
        table={table}
        columnStates={columnStates}
        onColumnOrderChange={updateColumnOrder}
      />
      <div className="overflow-hidden rounded-lg border">
        <DataTable
          table={table}
          columns={orderedColumns}
          dndEnabled={true}
          onReorder={handleReorder}
        />
      </div>
      <DataTableFooter
        table={table}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
