import * as React from 'react'
import { cn } from '@/packages/utils/styles.ts'
import { forwardRefWithAs } from '@/packages/utils/misc/forward-ref-with-as'

export interface HeadingProps {
  className?: string
  children: React.ReactNode
  id?: string
  as?: any
}

const Heading = forwardRefWithAs<HeadingProps, 'div'>(function Heading(
  { as: Comp = 'div', className, children, id, ...props },
  ref,
) {
  return (
    <Comp id={id} {...props} ref={ref} className={cn('', className)}>
      {children}
    </Comp>
  )
})

export const H1 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h1"
    className={cn(
      className,
      'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
    )}
    {...props}
  />
)

export const H2 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h2"
    className={cn(
      'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
      className,
    )}
    {...props}
  />
)

export const H3 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h3"
    className={cn(
      className,
      'scroll-m-20 text-2xl font-semibold tracking-tight',
    )}
    {...props}
  />
)

export const H4 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h4"
    className={cn(
      className,
      'scroll-m-20 text-xl font-semibold tracking-tight',
    )}
    {...props}
  />
)
