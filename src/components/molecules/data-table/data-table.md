# DataTable Component Architecture

## Overview

The DataTable component system provides a comprehensive solution for displaying and managing tabular data with features like search, filtering, sorting, pagination, and row selection. The architecture is modular, with separate components for header, footer, and table body.

## Architecture

### Components

#### 1. DataTable (Main Component)

- **Location**: `src/components/molecules/data-table/index.tsx`
- **Purpose**: Main table component that renders the table structure
- **Features**: Drag & drop row reordering, empty state handling

#### 2. DataTableHeader

- **Location**: `src/components/molecules/data-table/data-table-header.tsx`
- **Purpose**: Header section with search, filters, and view options
- **Features**:
  - Search input with debouncing
  - Multi-select filters (inline horizontal layout)
  - Column visibility and ordering controls

#### 3. DataTableFooter

- **Location**: `src/components/molecules/data-table/data-table-footer.tsx`
- **Purpose**: Footer section with selection count and pagination
- **Features**:
  - Selected row count display
  - Pagination controls (first, previous, page numbers, next, last)
  - Rows per page selector

#### 4. DataTableFilter

- **Location**: `src/components/molecules/data-table/data-table-filter.tsx`
- **Purpose**: Manages multiple filter selects
- **Features**: Renders filter selects in horizontal layout

#### 5. DataTableFilterSelect

- **Location**: `src/components/molecules/data-table/data-table-filter-select.tsx`
- **Purpose**: Wrapper for MultiSelect component with table-specific styling
- **Features**: Consistent styling and behavior for filter selects

### Hooks

#### 1. useTableSelection

- **Location**: `src/hooks/use-table-selection/`
- **Purpose**: Manages table row selection using Set for unique IDs
- **Features**:
  - Uses `Set<string>` internally for unique IDs
  - Automatic conversion between Set and `Record<string, boolean>` for TanStack Table
  - Provides selection methods: `selectRow`, `deselectRow`, `toggleRow`, `selectAll`, `clearSelection`
  - Syncs with TanStack Table's rowSelection state

#### 2. useTableFilters

- **Location**: `src/hooks/use-table-filters/`
- **Purpose**: Manages filter state and syncs with URL search params
- **Features**:
  - Filter state as `Record<string, Array<string>>`
  - Methods: `setFilter`, `clearFilter`, `clearAllFilters`
  - Tracks active filter count
  - Callback support for filter changes

## Usage Example

### Basic Setup

```tsx
import { DataTable } from '@/components/molecules/data-table'
import { DataTableHeader } from '@/components/molecules/data-table/data-table-header'
import { DataTableFooter } from '@/components/molecules/data-table/data-table-footer'
import { useTableSelection } from '@/hooks/use-table-selection'
import { useTableFilters } from '@/hooks/use-table-filters'
import type { FilterConfig } from '@/components/molecules/data-table/data-table.types'

// Define filter configurations
const filterConfigs: Array<FilterConfig> = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Inactive', value: 'INACTIVE' },
    ],
  },
]

function MyTable() {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
  })

  // Use selection hook
  const { rowSelection } = useTableSelection(table, (row) => row.id, {
    onSelectionChange: (ids) => {
      console.log('Selected:', ids)
    },
  })

  // Use filters hook
  const { filterValues, setFilter } = useTableFilters(
    filterConfigs,
    undefined,
    {
      onFilterChange: (filters) => {
        // Sync with URL or API
        navigate({ search: { status: filters.status } })
      },
    },
  )

  return (
    <div className="space-y-4">
      <DataTableHeader
        search={search}
        onSearch={handleSearch}
        filters={filterConfigs}
        filterValues={filterValues}
        onFilterChange={(filters) => {
          Object.keys(filters).forEach((key) => {
            setFilter(key, filters[key])
          })
        }}
        table={table}
        columnStates={columnStates}
        onColumnOrderChange={updateColumnOrder}
      />
      <DataTable table={table} columns={columns} />
      <DataTableFooter
        table={table}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
```

### With URL Search Params

```tsx
// Route definition
export const Route = createFileRoute('/users/')({
  validateSearch: z.object({
    search: z.string().optional(),
    status: z.array(z.string()).optional(),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
  }),
  component: UsersTemplate,
})

// Template component
function UsersTemplate() {
  const search = useSearch({ from: '/users/' })
  const navigate = useNavigate()

  // Initialize filters from URL
  const initialFilterValues = useMemo(() => {
    const values: Record<string, Array<string>> = {}
    if (search.status && Array.isArray(search.status)) {
      values.status = search.status
    }
    return values
  }, [search.status])

  // Use filters hook with URL sync
  const { filterValues, setFilter } = useTableFilters(
    filterConfigs,
    initialFilterValues,
    {
      onFilterChange: (filters) => {
        navigate({
          to: '/users',
          search: {
            ...search,
            status:
              filters.status && filters.status.length > 0
                ? filters.status
                : undefined,
            page: 1,
          },
        })
      },
    },
  )

  // ... rest of component
}
```

## Best Practices

### 1. Selection Management

- Use `useTableSelection` hook for all selection logic
- The hook automatically handles Set operations for unique IDs
- Always use `rowSelection` from the hook with TanStack Table's `state.rowSelection`

### 2. Filter Management

- Use `useTableFilters` hook for filter state
- Sync filters with URL search params for shareable URLs
- Use array format in URL: `status=ACTIVE&status=INACTIVE`

### 3. Component Composition

- Keep DataTableHeader, DataTable, and DataTableFooter as separate components
- Pass table instance to all components that need it
- Use callbacks for page changes and filter changes

### 4. Performance

- Use `useMemo` for expensive computations (column ordering, filtering)
- Debounce search input (already handled in DataTableHeader)
- Use TanStack Table's built-in pagination and sorting

### 5. Type Safety

- Define `FilterConfig` types for all filters
- Use TypeScript generics for table data types
- Leverage TanStack Router's type-safe search params

## API Reference

### DataTableHeader Props

```typescript
interface DataTableHeaderProps<TData> {
  search: string
  onSearch: (value: string) => void
  filters?: Array<FilterConfig>
  filterValues?: Record<string, Array<string>>
  onFilterChange?: (filters: Record<string, Array<string>>) => void
  table: Table<TData>
  columnStates?: Array<ColumnState>
  onColumnOrderChange?: (orderedIds: Array<string>) => void
  className?: string
}
```

### DataTableFooter Props

```typescript
interface DataTableFooterProps<TData> {
  table: Table<TData>
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  className?: string
}
```

### FilterConfig

```typescript
interface FilterConfig {
  key: string
  label: string
  options: Array<{ label: string; value: string }>
  placeholder?: string
}
```

## Related Documentation

- [useTableSelection Hook](./useTableSelection.md)
- [useTableFilters Hook](./useTableFilters.md)
- [TanStack Table Documentation](https://tanstack.com/table/latest)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
