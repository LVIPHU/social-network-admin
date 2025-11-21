import { useMemo } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

export type ColumnState = {
  id: string
  visible: boolean
  order: number
}

export const getTableColumnsKey = (routePath: string) => {
  return `table-columns-${routePath}`
}

export const useTableColumns = (
  routePath: string,
  defaultColumns: Array<string>,
) => {
  const storageKey = getTableColumnsKey(routePath)

  // Initialize default column states
  const defaultColumnStates: Array<ColumnState> = defaultColumns.map(
    (id, index) => ({
      id,
      visible: true,
      order: index,
    }),
  )

  const [columnStates, setColumnStates, removeColumnStates] = useLocalStorage<
    Array<ColumnState>
  >(storageKey, defaultColumnStates)

  // Get visible columns
  const visibleColumns = useMemo(() => {
    return columnStates
      .filter((state) => state.visible)
      .sort((a, b) => a.order - b.order)
      .map((state) => state.id)
  }, [columnStates])

  // Get column order
  const columnOrder = useMemo(() => {
    return columnStates
      .sort((a, b) => a.order - b.order)
      .map((state) => state.id)
  }, [columnStates])

  // Toggle column visibility
  const toggleColumn = (id: string) => {
    setColumnStates((prev) =>
      prev.map((state) =>
        state.id === id ? { ...state, visible: !state.visible } : state,
      ),
    )
  }

  // Update column order
  const updateColumnOrder = (orderedIds: Array<string>) => {
    setColumnStates((prev) => {
      const stateMap = new Map(prev.map((state) => [state.id, state]))
      return orderedIds.map((id, index) => {
        const existing = stateMap.get(id)
        return existing
          ? { ...existing, order: index }
          : { id, visible: true, order: index }
      })
    })
  }

  // Reset to default
  const resetColumns = () => {
    removeColumnStates()
  }

  return {
    columnStates,
    visibleColumns,
    columnOrder,
    toggleColumn,
    updateColumnOrder,
    resetColumns,
  }
}
