import { Trans } from '@lingui/react/macro'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AlertCircleIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { H1 } from '@/components/atoms/heading'
import type { FilterConfig } from '@/components/molecules/data-table/data-table.types'
import { UsersTable } from '@/components/organisms/tables/users.table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'
import { useTableFilters } from '@/hooks/use-table-filters'
import { useUsers } from '@/services/users'

// Filter configurations
const statusFilterConfig: FilterConfig = {
  key: 'status',
  label: 'Status',
  options: [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ],
  placeholder: 'Select status',
}

const filterConfigs: Array<FilterConfig> = [statusFilterConfig]

export default function UsersTemplate() {
  const search = useSearch({ from: '/_authenticated/users/' })
  const navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState<Array<string>>([])

  const handleRowSelect = useCallback((userIds: Array<string>) => {
    setSelectedRows(userIds)
  }, [])

  // Initialize filter values from URL
  const initialFilterValues = useMemo(() => {
    const values: Record<string, Array<string>> = {}
    if (search.status && Array.isArray(search.status)) {
      values.status = search.status
    }
    return values
  }, [search.status])

  // Use table filters hook
  const { filterValues, setFilter } = useTableFilters(
    filterConfigs,
    initialFilterValues,
    {
      onFilterChange: (filters) => {
        // Sync with URL
        void navigate({
          to: '/users',
          search: {
            ...search,
            status:
              filters.status && filters.status.length > 0
                ? filters.status
                : undefined,
            page: 1, // Reset to first page when filter changes
          },
        })
      },
    },
  )

  const params = useMemo(
    () => ({
      search: search.search,
      status: search.status,
      page: search.page || 1,
      limit: search.limit || 10,
    }),
    [search.search, search.status, search.page, search.limit],
  )

  const { users, loading, error } = useUsers(params)

  const handleSearch = useCallback(
    (value: string) => {
      void navigate({
        to: '/users',
        search: {
          ...search,
          search: value || undefined,
          page: 1,
        },
      })
    },
    [navigate, search],
  )

  const handleFilterChange = useCallback(
    (filters: Record<string, Array<string>>) => {
      // Update filter using hook's setFilter
      Object.keys(filters).forEach((key) => {
        setFilter(key, filters[key])
      })
    },
    [setFilter],
  )

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
        <H1>
          <Trans>User Management</Trans>
        </H1>
        <p className="text-muted-foreground">
          <Trans>Manage and view all users in the system</Trans>
        </p>
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
          search={search.search || ''}
          onSearch={handleSearch}
          filters={filterConfigs}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          pagination={
            users?.pagination || {
              page: 1,
              limit: 10,
              total_pages: 0,
              total_rows: 0,
            }
          }
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  )
}
