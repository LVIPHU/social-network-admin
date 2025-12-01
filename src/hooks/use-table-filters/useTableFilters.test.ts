import { act, renderHook } from '@testing-library/react'

import type { FilterConfig } from '@/components/molecules/data-table/data-table.types'

import { useTableFilters } from './useTableFilters'

const mockFilters: Array<FilterConfig> = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Inactive', value: 'INACTIVE' },
    ],
  },
  {
    key: 'role',
    label: 'Role',
    options: [
      { label: 'Admin', value: 'ADMIN' },
      { label: 'User', value: 'USER' },
    ],
  },
]

describe('useTableFilters', () => {
  it('should initialize with empty filter values', () => {
    const { result } = renderHook(() => useTableFilters(mockFilters))

    expect(result.current.filterValues.status).toEqual([])
    expect(result.current.filterValues.role).toEqual([])
    expect(result.current.hasActiveFilters).toBe(false)
    expect(result.current.activeFilterCount).toBe(0)
  })

  it('should initialize with provided initial values', () => {
    const initialValues = {
      status: ['ACTIVE'],
      role: ['ADMIN'],
    }

    const { result } = renderHook(() =>
      useTableFilters(mockFilters, initialValues),
    )

    expect(result.current.filterValues.status).toEqual(['ACTIVE'])
    expect(result.current.filterValues.role).toEqual(['ADMIN'])
    expect(result.current.hasActiveFilters).toBe(true)
    expect(result.current.activeFilterCount).toBe(2)
  })

  it('should set filter values', () => {
    const { result } = renderHook(() => useTableFilters(mockFilters))

    act(() => {
      result.current.setFilter('status', ['ACTIVE', 'INACTIVE'])
    })

    expect(result.current.filterValues.status).toEqual(['ACTIVE', 'INACTIVE'])
    expect(result.current.hasActiveFilters).toBe(true)
    expect(result.current.activeFilterCount).toBe(1)
  })

  it('should clear a specific filter', () => {
    const initialValues = {
      status: ['ACTIVE'],
      role: ['ADMIN'],
    }

    const { result } = renderHook(() =>
      useTableFilters(mockFilters, initialValues),
    )

    act(() => {
      result.current.clearFilter('status')
    })

    expect(result.current.filterValues.status).toEqual([])
    expect(result.current.filterValues.role).toEqual(['ADMIN'])
    expect(result.current.activeFilterCount).toBe(1)
  })

  it('should clear all filters', () => {
    const initialValues = {
      status: ['ACTIVE'],
      role: ['ADMIN'],
    }

    const { result } = renderHook(() =>
      useTableFilters(mockFilters, initialValues),
    )

    act(() => {
      result.current.clearAllFilters()
    })

    expect(result.current.filterValues.status).toEqual([])
    expect(result.current.filterValues.role).toEqual([])
    expect(result.current.hasActiveFilters).toBe(false)
    expect(result.current.activeFilterCount).toBe(0)
  })

  it('should call onFilterChange callback', () => {
    const onFilterChange = vi.fn()

    const { result } = renderHook(() =>
      useTableFilters(mockFilters, undefined, { onFilterChange }),
    )

    act(() => {
      result.current.setFilter('status', ['ACTIVE'])
    })

    expect(onFilterChange).toHaveBeenCalledWith({
      status: ['ACTIVE'],
      role: [],
    })
  })

  it('should track active filter count correctly', () => {
    const { result } = renderHook(() => useTableFilters(mockFilters))

    expect(result.current.activeFilterCount).toBe(0)

    act(() => {
      result.current.setFilter('status', ['ACTIVE'])
    })

    expect(result.current.activeFilterCount).toBe(1)

    act(() => {
      result.current.setFilter('role', ['ADMIN'])
    })

    expect(result.current.activeFilterCount).toBe(2)

    act(() => {
      result.current.clearFilter('status')
    })

    expect(result.current.activeFilterCount).toBe(1)
  })
})
