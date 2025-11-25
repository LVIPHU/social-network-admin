'use client'

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trans } from '@lingui/react/macro'
import type { Table } from '@tanstack/react-table'
import { GripVertical, Settings2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ColumnState } from '@/packages/utils/table-columns'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  columnStates?: Array<ColumnState>
  onColumnOrderChange?: (orderedIds: Array<string>) => void
}

function SortableColumnItem({
  column,
  onToggle,
}: {
  column: { id: string; getIsVisible: () => boolean }
  onToggle: (value: boolean) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2"
      {...attributes}
    >
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </div>
      <DropdownMenuCheckboxItem
        className="capitalize flex-1"
        checked={column.getIsVisible()}
        onCheckedChange={onToggle}
        onSelect={(e) => e.preventDefault()}
      >
        {column.id}
      </DropdownMenuCheckboxItem>
    </div>
  )
}

export function DataTableViewOptions<TData>({
  table,
  columnStates,
  onColumnOrderChange,
}: DataTableViewOptionsProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== 'undefined' && column.getCanHide(),
    )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id && onColumnOrderChange) {
      const oldIndex = columns.findIndex((col) => col.id === active.id)
      const newIndex = columns.findIndex((col) => col.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(
          columns.map((col) => col.id),
          oldIndex,
          newIndex,
        )
        onColumnOrderChange(newOrder)
      }
    }
  }

  const handleToggle = (columnId: string, value: boolean) => {
    const column = table.getColumn(columnId)
    if (column) {
      column.toggleVisibility(value)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 />
          <Trans>View options</Trans>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columnStates && onColumnOrderChange ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={columns.map((col) => col.id)}
              strategy={verticalListSortingStrategy}
            >
              {columns.map((column) => (
                <SortableColumnItem
                  key={column.id}
                  column={column}
                  onToggle={(value) => handleToggle(column.id, value)}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                handleToggle(column.id, Boolean(value))
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
