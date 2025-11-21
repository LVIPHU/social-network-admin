import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AlertCircleIcon, Search } from 'lucide-react'
import { Trans } from '@lingui/react/macro'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { H1 } from '@/components/atoms/heading'
import { Input } from '@/components/ui/input'
import { UsersTable } from '@/components/organisms/tables/users.table'
import { DataTablePagination } from '@/components/molecules/data-table/data-table-pagination'
import { useUsers } from '@/services/users'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'

export default function UsersTemplate() {
  const search = useSearch({ from: '/_authenticated/users/' })
  const navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState<Array<string>>([])

  const handleRowSelect = useCallback((userIds: Array<string>) => {
    setSelectedRows(userIds)
  }, [])

  const params = useMemo(
    () => ({
      search: search.search,
      page: search.page || 1,
      limit: search.limit || 10,
    }),
    [search.search, search.page, search.limit],
  )

  const { users, loading, error } = useUsers(params)

  const handleSearch = (value: string) => {
    void navigate({
      to: '/users',
      search: {
        ...search,
        search: value || undefined,
        page: 1,
      },
    })
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e.currentTarget.value)
    }
  }

  // Create a dummy table for pagination
  const table = useReactTable({
    data: users?.data || [],
    columns: [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: users?.pagination.total_pages || 0,
    state: {
      pagination: {
        pageIndex: (users?.pagination.page || 1) - 1,
        pageSize: users?.pagination.limit || 10,
      },
    },
  })

  const handlePageChange = (page: number) => {
    void navigate({
      to: '/users',
      search: {
        ...search,
        page,
      },
    })
  }

  const handlePageSizeChange = (pageSize: number) => {
    void navigate({
      to: '/users',
      search: {
        ...search,
        limit: pageSize,
        page: 1,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <H1 className="text-2xl font-bold">
          <Trans>User Management</Trans>
        </H1>
        <p className="text-muted-foreground">
          <Trans>Manage and view all users in the system</Trans>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by name or user ID..."
            defaultValue={search.search}
            onKeyDown={handleSearchKeyDown}
            className="pl-9"
          />
        </div>
      </div>

      {error && !loading && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>
            <Trans>Error loading users</Trans>
          </AlertTitle>
          <AlertDescription>
            <Trans>
              Please try again or contact support if the problem persists.
            </Trans>
          </AlertDescription>
        </Alert>
      )}

      {!error && (
        <UsersTable
          data={users?.data || []}
          loading={loading}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          pagination={
            users?.pagination || {
              page: 1,
              limit: 10,
              total_pages: 0,
              total_rows: 0,
            }
          }
        />
      )}

      {users && users.pagination.total_pages > 0 && (
        <DataTablePagination
          table={table}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  )
}
