import { cn } from '@/packages/utils/styles.ts'

import { DataTableFilterSelect } from './data-table-filter-select'
import type { DataTableFilterProps } from './data-table.types'

/**
 * DataTableFilter - Component for managing multiple filters in a data table
 *
 * This component renders multiple filter selects in a horizontal layout,
 * allowing users to filter table data by multiple criteria simultaneously.
 *
 * @example
 * ```tsx
 * <DataTableFilter
 *   filters={[
 *     {
 *       key: 'status',
 *       label: 'Status',
 *       options: [
 *         { label: 'Active', value: 'ACTIVE' },
 *         { label: 'Inactive', value: 'INACTIVE' }
 *       ]
 *     }
 *   ]}
 *   values={{ status: ['ACTIVE'] }}
 *   onChange={(key, values) => setFilter(key, values)}
 * />
 * ```
 */
export function DataTableFilter({
  filters,
  values,
  onChange,
  className,
}: DataTableFilterProps) {
  if (!filters || filters.length === 0) {
    return null
  }

  return (
    <div className={cn('flex items-end gap-4', className)}>
      {filters.map((filter) => (
        <DataTableFilterSelect
          key={filter.key}
          config={filter}
          selectedValues={values[filter.key] || []}
          onValueChange={(selectedValues) => {
            onChange(filter.key, selectedValues)
          }}
        />
      ))}
    </div>
  )
}
