import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import UsersTemplate from '@/components/templates/users.template'

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
  }),
  component: UsersTemplate,
})
