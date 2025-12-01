import { Search } from 'lucide-react'
import { useCallback, useRef } from 'react'

import { Input } from '@/components/ui/input.tsx'
import { cn } from '@/packages/utils/styles.ts'

import { DataTableFilter } from './data-table-filter'
import { DataTableViewOptions } from './data-table-view-options.tsx'
import type { DataTableHeaderProps } from './data-table.types'

/**
 * DataTableHeader - Header component for data tables with search, filters, and view options
 *
 * This component provides a consistent header layout for data tables, including:
 * - Search input for text-based filtering
 * - Multi-select filters for categorical filtering
 * - View options for column visibility and ordering
 *
 * @example
 * ```tsx
 * <DataTableHeader
 *   search={searchValue}
 *   onSearch={(value) => setSearch(value)}
 *   filters={filterConfigs}
 *   onFilterChange={(filters) => setFilters(filters)}
 *   table={table}
 *   columnStates={columnStates}
 *   onColumnOrderChange={updateColumnOrder}
 * />
 * ```
 */
export function DataTableHeader<TData>({
  search,
  onSearch,
  filters,
  filterValues = {},
  onFilterChange,
  table,
  columnStates,
  onColumnOrderChange,
  className,
}: DataTableHeaderProps<TData>) {
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  const handleSearchChange = useCallback(
    (value: string) => {
      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }

      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        onSearch(value)
      }, 300)
    },
    [onSearch],
  )

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        // Clear timeout and search immediately
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }
        onSearch(e.currentTarget.value)
      }
    },
    [onSearch],
  )

  const handleFilterChange = useCallback(
    (key: string, values: Array<string>) => {
      if (!onFilterChange) return

      // Merge with existing filter values
      const updatedFilters = {
        ...filterValues,
        [key]: values,
      }

      onFilterChange(updatedFilters)
    },
    [filterValues, onFilterChange],
  )

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Search, Filters, and View Options Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Input and Filters */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search..."
              defaultValue={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="pl-9"
            />
          </div>

          {/* Filters - Inline with search */}
          {filters && filters.length > 0 && onFilterChange && (
            <DataTableFilter
              filters={filters}
              values={filterValues}
              onChange={handleFilterChange}
            />
          )}
        </div>

        {/* View Options */}
        <DataTableViewOptions
          table={table}
          columnStates={columnStates}
          onColumnOrderChange={onColumnOrderChange}
        />
      </div>
    </div>
  )
}
