import { createFileRoute } from '@tanstack/react-router'

import { requireAuth } from '@/packages/guards'
import { AdminLayout } from '@/components/templates/admin.layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: (context) => {
    requireAuth(context)
  },
  component: AdminLayout,
})
