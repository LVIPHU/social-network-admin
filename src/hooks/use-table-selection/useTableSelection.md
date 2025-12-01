# useTableSelection Hook

Custom hook for managing table row selection using Set for unique IDs.

## Features

- Uses `Set<string>` internally to ensure unique row IDs
- Automatic conversion between Set (internal) and `Record<string, boolean>` (for TanStack Table)
- Provides composition methods leveraging Set operations
- Syncs with TanStack Table's rowSelection state
- Callback support for selection changes

## Usage

```tsx
import { useTableSelection } from '@/hooks/use-table-selection'
import { useReactTable } from '@tanstack/react-table'

function MyTable() {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
  })

  const {
    selectedRows,
    rowSelection,
    selectRow,
    clearSelection,
    isSelected,
    selectedCount,
  } = useTableSelection(table, (row) => row.id, {
    onSelectionChange: (ids) => {
      console.log('Selected:', ids)
    },
  })

  return (
    <div>
      <p>{selectedCount} rows selected</p>
      <button onClick={clearSelection}>Clear</button>
      {/* Use rowSelection with table */}
    </div>
  )
}
```

## API

### Parameters

- `table: Table<TData>` - TanStack Table instance
- `getRowId: (row: TData) => string` - Function to extract row ID
- `options?: UseTableSelectionOptions` - Optional configuration

### Return Value

- `selectedSet: Set<string>` - Internal Set of selected IDs
- `selectedRows: Array<string>` - Array of selected IDs
- `rowSelection: Record<string, boolean>` - Format for TanStack Table
- `selectRow(id: string): void` - Select a row
- `deselectRow(id: string): void` - Deselect a row
- `toggleRow(id: string): void` - Toggle row selection
- `selectAll(): void` - Select all visible rows
- `clearSelection(): void` - Clear all selections
- `isSelected(id: string): boolean` - Check if row is selected
- `selectedCount: number` - Count of selected rows
- `totalCount: number` - Count of total rows

## Notes

- The hook automatically syncs with TanStack Table's rowSelection state
- Set operations ensure unique IDs and provide efficient lookups
- Use `rowSelection` prop with TanStack Table's `state.rowSelection`
