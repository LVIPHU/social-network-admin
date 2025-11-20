import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth'

/**
 * Guard function to check if user is authenticated
 * Use this in route's `beforeLoad` to protect routes
 *
 * @param context - Router beforeLoad context (contains location, params, etc.)
 * @throws redirect to /auth/sign-in if not authenticated
 */
export const requireAuth = (context: {
  location: { pathname: string; search: Record<string, unknown> }
}) => {
  const isLoggedIn = Boolean(useAuthStore.getState().auth?.access_token)

  if (!isLoggedIn) {
    const location = context.location
    const searchParams = new URLSearchParams()
    Object.entries(location.search).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const searchString = searchParams.toString()
    const redirectTo =
      location.pathname + (searchString ? `?${searchString}` : '')

    throw redirect({
      to: '/auth/sign-in',
      search: {
        redirect: redirectTo !== '/auth/sign-in' ? redirectTo : undefined,
      },
      replace: true,
    })
  }
}

/**
 * Guard function to redirect if user is already authenticated
 * Use this in route's `beforeLoad` for public routes (like sign-in)
 *
 * @param context - Router beforeLoad context
 * @throws redirect to /dashboard if authenticated
 */
export const redirectIfAuthenticated = (context: {
  location: { pathname: string; search?: Record<string, unknown> }
}) => {
  const isLoggedIn = Boolean(useAuthStore.getState().auth?.access_token)

  if (isLoggedIn) {
    // Get redirect parameter if exists, otherwise go to dashboard
    const search = context.location.search as { redirect?: string }
    const redirectTo = search.redirect || '/dashboard'

    throw redirect({
      to: redirectTo,
      replace: true,
    })
  }
}
