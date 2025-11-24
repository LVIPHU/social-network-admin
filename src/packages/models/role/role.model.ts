import { z } from 'zod'
import { dateSchema } from '@/packages/utils/date.ts'

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_by: z.string(),
  created_at: dateSchema,
  updated_at: dateSchema,
})

export type RoleDto = z.infer<typeof roleSchema>
