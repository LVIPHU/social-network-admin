import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import { useTableSelection } from './useTableSelection'

interface User {
  id: string
  name: string
  email: string
}

const mockData: Array<User> = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
]

export default function Component() {
  const [data] = useState(mockData)

  const table = useReactTable({
    data,
    columns: [],
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  })

  const {
    selectedRows,
    selectedSet,
    rowSelection,
    selectRow,
    deselectRow,
    toggleRow,
    selectAll,
    clearSelection,
    isSelected,
    selectedCount,
    totalCount,
  } = useTableSelection(table, (row) => row.id, {
    onSelectionChange: (ids) => {
      console.log('Selection changed:', ids)
    },
  })

  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Selection Controls</h2>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Select All
          </button>
          <button
            onClick={clearSelection}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Row Actions</h3>
        <div className="space-y-2">
          {data.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-2 border rounded"
            >
              <span>{user.name}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
              <button
                onClick={() => toggleRow(user.id)}
                className={`px-3 py-1 rounded ${
                  isSelected(user.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {isSelected(user.id) ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Selection State</h3>
        <p>
          Selected Count: {selectedCount} / {totalCount}
        </p>
        <p>Selected Rows (Array): {selectedRows.join(', ') || 'None'}</p>
        <p>Selected Set Size: {selectedSet.size}</p>
        <p>Row Selection (Record): {JSON.stringify(rowSelection, null, 2)}</p>
      </div>
    </div>
  )
}
