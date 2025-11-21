import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import type { ColumnDef } from '@tanstack/react-table'
import type { UserDto } from '@/packages/models/user/user.model.ts'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { DataTable } from '@/components/molecules/data-table'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header.tsx'
import { DataTableViewOptions } from '@/components/molecules/data-table/data-table-view-options.tsx'
import { DataTableSkeleton } from '@/components/molecules/data-table/data-table-skeleton.tsx'
import { useTableColumns } from '@/packages/utils/table-columns.ts'
import { dragColumn } from '@/components/molecules/data-table/drag-column.tsx'

type UsersTableProps = {
  data: Array<UserDto>
  loading: boolean
  selectedRows: Array<string>
  onRowSelect: (userIds: Array<string>) => void
  pagination: {
    page: number
    limit: number
    total_pages: number
    total_rows: number
  }
}

const defaultColumnIds = ['user_id', 'username', 'name', 'status', 'created_at']

export function UsersTable({
  data,
  loading,
  onRowSelect,
  pagination,
}: UsersTableProps) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [localData, setLocalData] = useState<Array<UserDto & { id: string }>>(
    [],
  )
  const prevSelectedRef = useRef<string>('')

  const { columnStates, visibleColumns, columnOrder, updateColumnOrder } =
    useTableColumns('/users', defaultColumnIds)

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
      rowSelection,
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      },
    },
    onRowSelectionChange: setRowSelection,
  })

  // Sync row selection with parent
  useEffect(() => {
    const selected = Object.keys(rowSelection).filter(
      (key) => rowSelection[key],
    )
    const selectedUserIds = selected
      .map((index) => localData[Number(index)]?.user_id)
      .filter(Boolean)

    // Only call onRowSelect if selection actually changed
    const currentSelected = selectedUserIds.sort().join(',')

    if (currentSelected !== prevSelectedRef.current) {
      prevSelectedRef.current = currentSelected
      onRowSelect(selectedUserIds)
    }
  }, [rowSelection, localData, onRowSelect])

  if (loading) {
    return <DataTableSkeleton columns={orderedColumns.length} />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <DataTableViewOptions
          table={table}
          columnStates={columnStates}
          onColumnOrderChange={updateColumnOrder}
        />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <DataTable
          table={table}
          columns={orderedColumns}
          dndEnabled={true}
          onReorder={handleReorder}
        />
      </div>
    </div>
  )
}
