import type { Table } from '@tanstack/react-table'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function DataTablePagination<TData>({
  table,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()
  const canPreviousPage = table.getCanPreviousPage()
  const canNextPage = table.getCanNextPage()

  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1)
    onPageChange?.(page)
  }

  const handleFirstPage = () => {
    if (canPreviousPage) {
      handlePageChange(1)
    }
  }

  const handlePreviousPage = () => {
    if (canPreviousPage) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (canNextPage) {
      handlePageChange(currentPage + 1)
    }
  }

  const handleLastPage = () => {
    if (canNextPage) {
      handlePageChange(pageCount)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: Array<number | 'ellipsis'> = []
    const totalPages = pageCount
    const current = currentPage

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (current <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (current >= totalPages - 2) {
        // Near the end
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push('ellipsis')
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label
            htmlFor="rows-per-page"
            className="text-sm font-medium min-w-[100px]"
          >
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              const pageSize = Number(value)
              table.setPageSize(pageSize)
              onPageSizeChange?.(pageSize)
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Go to first page"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  handleFirstPage()
                }}
                className={
                  !canPreviousPage ? 'pointer-events-none opacity-50' : ''
                }
              >
                <ChevronFirst className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Go to previous page"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  handlePreviousPage()
                }}
                className={
                  !canPreviousPage ? 'pointer-events-none opacity-50' : ''
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            {getPageNumbers().map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Go to next page"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  handleNextPage()
                }}
                className={!canNextPage ? 'pointer-events-none opacity-50' : ''}
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Go to last page"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  handleLastPage()
                }}
                className={!canNextPage ? 'pointer-events-none opacity-50' : ''}
              >
                <ChevronLast className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
