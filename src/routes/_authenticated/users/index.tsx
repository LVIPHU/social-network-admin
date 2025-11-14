import { createFileRoute } from '@tanstack/react-router'
import UsersTemplate from '@/components/templates/users.template'

export const Route = createFileRoute('/_authenticated/users/')({
  component: UsersTemplate,
})
