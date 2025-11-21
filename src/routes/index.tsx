import { createFileRoute, redirect } from '@tanstack/react-router'

import { useAuthStore } from '@/stores/auth'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const user = Boolean(useAuthStore.getState().auth?.access_token)
    if (user) {
      throw redirect({
        to: '/dashboard',
        replace: true,
      })
    } else {
      throw redirect({
        to: '/auth',
      })
    }
  },
})
