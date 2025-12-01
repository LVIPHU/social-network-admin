import type { Table } from '@tanstack/react-table'

import type { ColumnState } from '@/packages/utils/table-columns'

/**
 * Configuration for a single filter in the data table
 */
export interface FilterConfig {
  /** Unique key identifier for the filter */
  key: string
  /** Display label for the filter */
  label: string
  /** Available options for the filter */
  options: Array<{ label: string; value: string }>
  /** Placeholder text when no options are selected */
  placeholder?: string
}

/**
 * Props for DataTableFilterSelect component
 */
export interface DataTableFilterSelectProps {
  /** Filter configuration */
  config: FilterConfig
  /** Currently selected values */
  selectedValues: Array<string>
  /** Callback when selection changes */
  onValueChange: (values: Array<string>) => void
  /** Additional className */
  className?: string
}

/**
 * Props for DataTableFilter component
 */
export interface DataTableFilterProps {
  /** Array of filter configurations */
  filters: Array<FilterConfig>
  /** Current filter values */
  values: Record<string, Array<string>>
  /** Callback when any filter changes */
  onChange: (key: string, values: Array<string>) => void
  /** Additional className */
  className?: string
}

/**
 * Props for DataTableHeader component
 */
export interface DataTableHeaderProps<TData> {
  /** Current search value */
  search: string
  /** Callback when search value changes */
  onSearch: (value: string) => void
  /** Optional filter configurations */
  filters?: Array<FilterConfig>
  /** Current filter values */
  filterValues?: Record<string, Array<string>>
  /** Callback when filter values change */
  onFilterChange?: (filters: Record<string, Array<string>>) => void
  /** TanStack Table instance */
  table: Table<TData>
  /** Column states for view options */
  columnStates?: Array<ColumnState>
  /** Callback when column order changes */
  onColumnOrderChange?: (orderedIds: Array<string>) => void
  /** Additional className */
  className?: string
}

/**
 * Props for DataTableFooter component
 */
export interface DataTableFooterProps<TData> {
  /** TanStack Table instance */
  table: Table<TData>
  /** Callback when page changes */
  onPageChange?: (page: number) => void
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void
  /** Additional className */
  className?: string
}
