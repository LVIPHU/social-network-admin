import { createFileRoute } from '@tanstack/react-router'
import AdminTemplate from '@/components/templates/admin.template'

export const Route = createFileRoute('/_authenticated/admin/')({
  component: AdminTemplate,
})
