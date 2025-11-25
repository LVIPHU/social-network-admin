import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import UsersTemplate from '@/components/templates/users.template'
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from '@/constants/app.constants.ts'

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.number().min(1).default(DEFAULT_PAGE_NUMBER),
    limit: z.number().min(1).max(100).default(DEFAULT_PAGE_SIZE),
  }),
  component: UsersTemplate,
})
