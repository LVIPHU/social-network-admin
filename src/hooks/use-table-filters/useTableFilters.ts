import { useCallback, useMemo, useState } from 'react'

import type { FilterConfig } from '@/components/molecules/data-table/data-table.types'

/**
 * Options for customizing the behavior of table filters
 */
export interface UseTableFiltersOptions {
  /**
   * Callback when filter values change
   */
  onFilterChange?: (filters: Record<string, Array<string>>) => void
}

/**
 * Return type for useTableFilters hook
 */
export interface UseTableFiltersReturn {
  /** Current filter values */
  filterValues: Record<string, Array<string>>
  /** Set filter values for a specific key */
  setFilter: (key: string, values: Array<string>) => void
  /** Clear filter for a specific key */
  clearFilter: (key: string) => void
  /** Clear all filters */
  clearAllFilters: () => void
  /** Check if any filter is active */
  hasActiveFilters: boolean
  /** Get active filter count */
  activeFilterCount: number
}

/**
 * Custom hook for managing table filters
 *
 * This hook manages filter state and provides methods to update filters.
 * Filters are stored as Record<string, Array<string>> where keys are filter
 * keys and values are arrays of selected filter values.
 *
 * @param {Array<FilterConfig>} filters - Array of filter configurations
 * @param {Record<string, Array<string>>} [initialValues] - Initial filter values
 * @param {UseTableFiltersOptions} [options] - Optional configuration
 * @returns {UseTableFiltersReturn} Filter state and methods
 *
 * @example
 * ```tsx
 * const filters = [
 *   {
 *     key: 'status',
 *     label: 'Status',
 *     options: [
 *       { label: 'Active', value: 'ACTIVE' },
 *       { label: 'Inactive', value: 'INACTIVE' }
 *     ]
 *   }
 * ]
 *
 * const {
 *   filterValues,
 *   setFilter,
 *   clearFilter,
 *   clearAllFilters
 * } = useTableFilters(filters, {
 *   onFilterChange: (values) => {
 *     // Sync with URL or API
 *   }
 * })
 *
 * // Set filter
 * setFilter('status', ['ACTIVE', 'INACTIVE'])
 *
 * // Clear filter
 * clearFilter('status')
 * ```
 */
export function useTableFilters(
  filters: Array<FilterConfig>,
  initialValues?: Record<string, Array<string>>,
  options: UseTableFiltersOptions = {},
): UseTableFiltersReturn {
  const { onFilterChange } = options

  // Initialize filter values from configs and initial values
  const initialFilterValues = useMemo(() => {
    const values: Record<string, Array<string>> = {}
    filters.forEach((filter) => {
      values[filter.key] = initialValues?.[filter.key] || []
    })
    return values
  }, [filters, initialValues])

  const [filterValues, setFilterValues] =
    useState<Record<string, Array<string>>>(initialFilterValues)

  // Set filter values for a specific key
  const setFilter = useCallback(
    (key: string, values: Array<string>) => {
      setFilterValues((prev) => {
        const next = { ...prev, [key]: values }
        onFilterChange?.(next)
        return next
      })
    },
    [onFilterChange],
  )

  // Clear filter for a specific key
  const clearFilter = useCallback(
    (key: string) => {
      setFilterValues((prev) => {
        const next = { ...prev, [key]: [] }
        onFilterChange?.(next)
        return next
      })
    },
    [onFilterChange],
  )

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilterValues((prev) => {
      const next: Record<string, Array<string>> = {}
      Object.keys(prev).forEach((key) => {
        next[key] = []
      })
      onFilterChange?.(next)
      return next
    })
  }, [onFilterChange])

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filterValues).some((values) => values.length > 0)
  }, [filterValues])

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(filterValues).filter((values) => values.length > 0)
      .length
  }, [filterValues])

  return {
    filterValues,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
  }
}
