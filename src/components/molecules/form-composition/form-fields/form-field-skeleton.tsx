import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/packages/utils/styles'

import type { FormFieldType } from '../form-composition.types'

/**
 * FormFieldSkeleton - Skeleton component for form fields
 */
export function FormFieldSkeleton({
  type,
  colSpan = 1,
  rowSpan = 1,
  className,
}: {
  type: FormFieldType
  colSpan?: number
  rowSpan?: number
  className?: string
}) {
  const skeletonClass = cn(className)

  const skeletonStyle = {
    gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : undefined,
    gridRow: rowSpan ? `span ${rowSpan} / span ${rowSpan}` : undefined,
  }

  switch (type) {
    case 'input':
    case 'password':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="h-10 w-full" />
        </div>
      )
    case 'textarea':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="h-24 w-full" />
        </div>
      )
    case 'select':
    case 'combobox':
    case 'multi-select':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="h-10 w-full" />
        </div>
      )
    case 'checkbox':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      )
    case 'radio':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      )
    case 'switch':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-11 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      )
    case 'slider':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="h-5 w-full" />
        </div>
      )
    case 'calendar':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="h-[300px] w-full" />
        </div>
      )
    case 'image-upload':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="aspect-square w-full rounded-md" />
        </div>
      )
    case 'input-group':
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="h-10 w-full" />
        </div>
      )
    default:
      return (
        <div className={skeletonClass} style={skeletonStyle}>
          <Skeleton className="h-10 w-full" />
        </div>
      )
  }
}
