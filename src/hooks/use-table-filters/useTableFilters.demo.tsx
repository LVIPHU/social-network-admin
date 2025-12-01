import type { FilterConfig } from '@/components/molecules/data-table/data-table.types'

import { useTableFilters } from './useTableFilters'

const filters: Array<FilterConfig> = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Inactive', value: 'INACTIVE' },
      { label: 'Pending', value: 'PENDING' },
    ],
  },
  {
    key: 'role',
    label: 'Role',
    options: [
      { label: 'Admin', value: 'ADMIN' },
      { label: 'User', value: 'USER' },
      { label: 'Guest', value: 'GUEST' },
    ],
  },
]

export default function Component() {
  const {
    filterValues,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useTableFilters(filters, undefined, {
    onFilterChange: (values) => {
      console.log('Filters changed:', values)
    },
  })

  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Filter Controls</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('status', ['ACTIVE'])}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Set Status: Active
          </button>
          <button
            onClick={() => setFilter('status', ['ACTIVE', 'INACTIVE'])}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Set Status: Active + Inactive
          </button>
          <button
            onClick={() => clearFilter('status')}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Clear Status
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Filter Values</h3>
        <div className="space-y-2">
          {filters.map((filter) => (
            <div key={filter.key} className="p-2 border rounded">
              <div className="font-semibold">{filter.label}</div>
              <div className="text-sm text-gray-600">
                Selected: {filterValues[filter.key]?.join(', ') || 'None'}
              </div>
              <div className="mt-2 flex gap-2">
                {filter.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      const current = filterValues[filter.key] || []
                      const isSelected = current.includes(option.value)
                      if (isSelected) {
                        setFilter(
                          filter.key,
                          current.filter((v) => v !== option.value),
                        )
                      } else {
                        setFilter(filter.key, [...current, option.value])
                      }
                    }}
                    className={`px-3 py-1 rounded text-sm ${
                      filterValues[filter.key]?.includes(option.value)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Filter State</h3>
        <p>Has Active Filters: {hasActiveFilters ? 'Yes' : 'No'}</p>
        <p>Active Filter Count: {activeFilterCount}</p>
        <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto">
          {JSON.stringify(filterValues, null, 2)}
        </pre>
      </div>
    </div>
  )
}
