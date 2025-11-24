import { z } from 'zod'
import { userSchema } from '@/packages/models'
import { roleSchema } from '@/packages/models/role'

export const adminSchema = userSchema.omit({ user_id: true }).extend({
  id: z.number(),
  roles: z.array(roleSchema),
  password: z.string().optional(),
})

export type AdminDto = z.infer<typeof adminSchema>
