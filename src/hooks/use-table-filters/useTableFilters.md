# useTableFilters Hook

Custom hook for managing table filter state.

## Features

- Manages filter state as `Record<string, Array<string>>`
- Provides methods to set, clear, and manage filters
- Tracks active filter count
- Callback support for filter changes
- Syncs with URL search params (when used with router)

## Usage

```tsx
import { useTableFilters } from '@/hooks/use-table-filters'
import type { FilterConfig } from '@/components/molecules/data-table/data-table.types'

const filters: Array<FilterConfig> = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Inactive', value: 'INACTIVE' },
    ],
  },
]

function MyTable() {
  const {
    filterValues,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
  } = useTableFilters(filters, undefined, {
    onFilterChange: (values) => {
      // Sync with URL or API
      navigate({
        search: {
          status: values.status,
        },
      })
    },
  })

  return (
    <div>
      <button onClick={() => setFilter('status', ['ACTIVE'])}>
        Filter Active
      </button>
      <button onClick={() => clearFilter('status')}>Clear Status</button>
      {hasActiveFilters && <button onClick={clearAllFilters}>Clear All</button>}
    </div>
  )
}
```

## API

### Parameters

- `filters: Array<FilterConfig>` - Array of filter configurations
- `initialValues?: Record<string, Array<string>>` - Initial filter values
- `options?: UseTableFiltersOptions` - Optional configuration

### Return Value

- `filterValues: Record<string, Array<string>>` - Current filter values
- `setFilter(key: string, values: Array<string>): void` - Set filter values
- `clearFilter(key: string): void` - Clear a specific filter
- `clearAllFilters(): void` - Clear all filters
- `hasActiveFilters: boolean` - Whether any filter is active
- `activeFilterCount: number` - Number of active filters

## Notes

- Filter values are stored as arrays to support multi-select filters
- Use with TanStack Router to sync with URL search params
- Format: `status=ACTIVE&status=INACTIVE` (array in URL)
