import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'

import { useTableSelection } from './useTableSelection'

interface TestData {
  id: string
  name: string
}

const mockData: Array<TestData> = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
]

// Helper to create a table instance
function createTable(data: Array<TestData>) {
  let table: ReturnType<typeof useReactTable<TestData>>

  function TestComponent() {
    const [tableData] = useState(data)
    table = useReactTable({
      data: tableData,
      columns: [],
      getCoreRowModel: getCoreRowModel(),
      getRowId: (row) => row.id,
    })
    return null
  }

  renderHook(() => TestComponent())
  return table!
}

describe('useTableSelection', () => {
  it('should initialize with empty selection', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    expect(result.current.selectedSet.size).toBe(0)
    expect(result.current.selectedRows).toEqual([])
    expect(result.current.selectedCount).toBe(0)
  })

  it('should select a row', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    act(() => {
      result.current.selectRow('1')
    })

    expect(result.current.isSelected('1')).toBe(true)
    expect(result.current.selectedSet.has('1')).toBe(true)
    expect(result.current.selectedCount).toBe(1)
  })

  it('should deselect a row', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    act(() => {
      result.current.selectRow('1')
      result.current.deselectRow('1')
    })

    expect(result.current.isSelected('1')).toBe(false)
    expect(result.current.selectedCount).toBe(0)
  })

  it('should toggle row selection', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    act(() => {
      result.current.toggleRow('1')
    })

    expect(result.current.isSelected('1')).toBe(true)

    act(() => {
      result.current.toggleRow('1')
    })

    expect(result.current.isSelected('1')).toBe(false)
  })

  it('should select all rows', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    act(() => {
      result.current.selectAll()
    })

    expect(result.current.selectedCount).toBe(3)
    expect(result.current.selectedRows).toEqual(['1', '2', '3'])
  })

  it('should clear all selections', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    act(() => {
      result.current.selectAll()
      result.current.clearSelection()
    })

    expect(result.current.selectedCount).toBe(0)
    expect(result.current.selectedRows).toEqual([])
  })

  it('should maintain unique IDs using Set', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    act(() => {
      result.current.selectRow('1')
      result.current.selectRow('1') // Duplicate
      result.current.selectRow('1') // Duplicate
    })

    expect(result.current.selectedCount).toBe(1)
    expect(result.current.selectedSet.size).toBe(1)
  })

  it('should convert Set to Record for TanStack Table', () => {
    const table = createTable(mockData)
    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id),
    )

    act(() => {
      result.current.selectRow('1')
      result.current.selectRow('2')
    })

    const record = result.current.rowSelection
    expect(typeof record).toBe('object')
    // Record should have row indices as keys
    expect(Object.keys(record).length).toBeGreaterThan(0)
  })

  it('should call onSelectionChange callback', () => {
    const table = createTable(mockData)
    const onSelectionChange = vi.fn()

    const { result } = renderHook(() =>
      useTableSelection(table, (row) => row.id, {
        onSelectionChange,
      }),
    )

    act(() => {
      result.current.selectRow('1')
    })

    expect(onSelectionChange).toHaveBeenCalledWith(['1'])
  })
})
