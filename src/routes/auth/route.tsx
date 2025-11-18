import { createFileRoute } from '@tanstack/react-router'

import { AuthLayout } from '@/components/templates/layouts/auth.layout.tsx'
import { redirectIfAuthenticated } from '@/packages/guards'

export const Route = createFileRoute('/auth')({
  beforeLoad: (context) => {
    redirectIfAuthenticated(context)
  },
  component: AuthLayout,
})
