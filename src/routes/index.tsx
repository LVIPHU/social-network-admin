import { createFileRoute, redirect } from '@tanstack/react-router'

import { useAuthStore } from '@/stores/auth'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user
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
