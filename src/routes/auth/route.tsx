import { createFileRoute } from '@tanstack/react-router'

import { AuthLayout } from '@/components/templates/auth.layout'
import { redirectIfAuthenticated } from '@/packages/guards'

export const Route = createFileRoute('/auth')({
  beforeLoad: (context) => {
    redirectIfAuthenticated(context)
  },
  component: AuthLayout,
})
