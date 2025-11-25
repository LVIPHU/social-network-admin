import { z } from 'zod'

import { roleSchema } from '@/packages/models/role/role.model'
import { userSchema } from '@/packages/models/user/user.model'

export const adminSchema = userSchema.omit({ user_id: true }).extend({
  id: z.number(),
  roles: z.array(roleSchema),
  password: z.string().optional(),
})

export type AdminDto = z.infer<typeof adminSchema>
