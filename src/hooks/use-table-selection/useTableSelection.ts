import type { Table } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * Options for customizing the behavior of table selection
 */
export interface UseTableSelectionOptions {
  /**
   * If true, the hook will sync with TanStack Table's rowSelection state
   * @default true
   */
  syncWithTable?: boolean
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedIds: Array<string>) => void
}

/**
 * Return type for useTableSelection hook
 */
export interface UseTableSelectionReturn {
  /** Set of selected row IDs (internal state) */
  selectedSet: Set<string>
  /** Array of selected row IDs */
  selectedRows: Array<string>
  /** Record format for TanStack Table rowSelection */
  rowSelection: Record<string, boolean>
  /** Select a row by ID */
  selectRow: (id: string) => void
  /** Deselect a row by ID */
  deselectRow: (id: string) => void
  /** Toggle selection of a row by ID */
  toggleRow: (id: string) => void
  /** Select all visible rows */
  selectAll: () => void
  /** Clear all selections */
  clearSelection: () => void
  /** Check if a row is selected */
  isSelected: (id: string) => boolean
  /** Get count of selected rows */
  selectedCount: number
  /** Get count of total rows */
  totalCount: number
}

/**
 * Custom hook for managing table row selection using Set for unique IDs
 *
 * This hook uses a Set internally to ensure unique row IDs and provides
 * automatic conversion between Set (internal) and Record<string, boolean>
 * (for TanStack Table compatibility).
 *
 * @template TData - The type of data in the table
 * @param {Table<TData>} table - TanStack Table instance
 * @param {(row: TData) => string} getRowId - Function to extract row ID from data
 * @param {UseTableSelectionOptions} [options] - Optional configuration
 * @returns {UseTableSelectionReturn} Selection state and methods
 *
 * @example
 * ```tsx
 * const {
 *   selectedRows,
 *   rowSelection,
 *   selectRow,
 *   clearSelection,
 *   isSelected
 * } = useTableSelection(table, (row) => row.id)
 *
 * // Use rowSelection with TanStack Table
 * const table = useReactTable({
 *   data,
 *   columns,
 *   state: { rowSelection },
 *   onRowSelectionChange: (updater) => {
 *     // Handle table's selection changes
 *   }
 * })
 * ```
 */
export function useTableSelection<TData>(
  table: Table<TData>,
  getRowId: (row: TData) => string,
  options: UseTableSelectionOptions = {},
): UseTableSelectionReturn {
  const { syncWithTable = true, onSelectionChange } = options

  // Internal state using Set for unique IDs
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())

  // Get all row IDs from table
  const allRowIds = useMemo(() => {
    return table.getRowModel().rows.map((row) => getRowId(row.original))
  }, [table, getRowId])

  // Convert Set to Record for TanStack Table
  const rowSelection = useMemo(() => {
    const record: Record<string, boolean> = {}
    selectedSet.forEach((id) => {
      // Find row index by ID
      const rowIndex = allRowIds.indexOf(id)
      if (rowIndex !== -1) {
        record[rowIndex.toString()] = true
      }
    })
    return record
  }, [selectedSet, allRowIds])

  // Convert Set to Array
  const selectedRows = useMemo(() => {
    return Array.from(selectedSet)
  }, [selectedSet])

  // Select a row
  const selectRow = useCallback((id: string) => {
    setSelectedSet((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  // Deselect a row
  const deselectRow = useCallback((id: string) => {
    setSelectedSet((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  // Toggle row selection
  const toggleRow = useCallback((id: string) => {
    setSelectedSet((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  // Select all visible rows
  const selectAll = useCallback(() => {
    setSelectedSet(new Set(allRowIds))
  }, [allRowIds])

  // Clear all selections
  const clearSelection = useCallback(() => {
    setSelectedSet(new Set())
  }, [])

  // Check if row is selected
  const isSelected = useCallback(
    (id: string) => {
      return selectedSet.has(id)
    },
    [selectedSet],
  )

  // Sync with TanStack Table's rowSelection
  useEffect(() => {
    if (!syncWithTable) return

    const tableSelection = table.getState().rowSelection
    const tableSelectedIds = new Set<string>()

    // Convert table's rowSelection (Record<index, boolean>) to Set of IDs
    Object.keys(tableSelection).forEach((index) => {
      const rowIndex = Number.parseInt(index, 10)
      const row = table.getRowModel().rows[rowIndex]
      if (row) {
        const id = getRowId(row.original)
        tableSelectedIds.add(id)
      }
    })

    // Update internal Set if different (using size and content check)
    const currentIds = Array.from(selectedSet).sort().join(',')
    const tableIds = Array.from(tableSelectedIds).sort().join(',')

    if (currentIds !== tableIds) {
      setSelectedSet(tableSelectedIds)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().rowSelection, syncWithTable])

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows)
    }
  }, [selectedRows, onSelectionChange])

  return {
    selectedSet,
    selectedRows,
    rowSelection,
    selectRow,
    deselectRow,
    toggleRow,
    selectAll,
    clearSelection,
    isSelected,
    selectedCount: selectedSet.size,
    totalCount: allRowIds.length,
  }
}
