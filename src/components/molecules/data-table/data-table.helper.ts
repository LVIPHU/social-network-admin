import type { ColumnDef } from '@tanstack/react-table'

import { dragColumn } from './drag-column'

export function withDndColumn<T>(
  columns: Array<ColumnDef<T>>,
): Array<ColumnDef<T>> {
  return [dragColumn as ColumnDef<T>, ...columns]
}
