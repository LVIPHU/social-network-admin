import { createFileRoute } from '@tanstack/react-router'

import { AdminLayout } from '@/components/templates/layouts/admin.layout.tsx'
import { requireAuth } from '@/packages/guards'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: (context) => {
    requireAuth(context)
  },
  component: AdminLayout,
})
