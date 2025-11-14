import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function Breadcrumbs() {
  const location = useLocation()
  const pathname = location.pathname

  // Skip root path
  if (pathname === '/') return null

  const breadcrumbItems = buildBreadcrumbs(pathname)

  if (breadcrumbItems.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <React.Fragment key={item.pathname}>
              {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.pathname}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/**
 * Convert pathname to readable label
 * e.g., "/dashboard" -> "Dashboard", "/auth/sign-in" -> "Sign In"
 */
function pathnameToLabel(pathname: string): string {
  const segments = pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)

  if (segments.length === 0) return ''

  const lastSegment = segments[segments.length - 1]

  return lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Build breadcrumb items from pathname
 */
function buildBreadcrumbs(pathname: string) {
  const segments = pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)

  if (segments.length === 0) return []

  const items = []
  let currentPath = ''

  for (const segment of segments) {
    currentPath += `/${segment}`
    items.push({
      label: pathnameToLabel(currentPath),
      pathname: currentPath,
    })
  }

  return items
}
