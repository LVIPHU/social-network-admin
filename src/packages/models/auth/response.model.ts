import { z } from 'zod'
import { userSchema } from '../user'

export const authResponseSchema = z.object({
  status: z.boolean(),
  user: userSchema,
})

export type AuthResponseDto = z.infer<typeof authResponseSchema>
