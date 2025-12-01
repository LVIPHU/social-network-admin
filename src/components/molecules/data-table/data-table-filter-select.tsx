import { MultiSelect } from '@/components/atoms/multi-select'
import { cn } from '@/packages/utils/styles.ts'

import type { DataTableFilterSelectProps } from './data-table.types'

/**
 * DataTableFilterSelect - Wrapper component for MultiSelect used in data table filters
 *
 * This component provides a consistent styling and behavior for filter selects
 * in data tables. It wraps the MultiSelect component with table-specific defaults.
 *
 * @example
 * ```tsx
 * <DataTableFilterSelect
 *   config={{
 *     key: 'status',
 *     label: 'Status',
 *     options: [
 *       { label: 'Active', value: 'ACTIVE' },
 *       { label: 'Inactive', value: 'INACTIVE' }
 *     ]
 *   }}
 *   selectedValues={['ACTIVE']}
 *   onValueChange={(values) => setFilter('status', values)}
 * />
 * ```
 */
export function DataTableFilterSelect({
  config,
  selectedValues,
  onValueChange,
  className,
}: DataTableFilterSelectProps) {
  const options = config.options.map((option) => ({
    label: option.label,
    value: option.value,
  }))

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <MultiSelect
        options={options}
        onValueChange={onValueChange}
        defaultValue={selectedValues}
        placeholder={
          config.placeholder || `Select ${config.label.toLowerCase()}`
        }
        variant="secondary"
        maxCount={2}
        className="w-full min-w-[150px]"
        popoverClassName="w-[200px]"
        searchable
        hideSelectAll={false}
        resetOnDefaultValueChange={true}
      />
    </div>
  )
}
