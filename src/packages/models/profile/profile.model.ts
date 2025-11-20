import { z } from 'zod'
import { userSchema } from '../user'

export const profileSchema = userSchema.extend({
  roles: z.array(z.string()).default(['Viewer']),
})

export type ProfileDto = z.infer<typeof profileSchema>
