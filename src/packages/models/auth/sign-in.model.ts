import { z } from 'zod'
import { emailSchema, usernameSchema } from '../user'

const identifierSchema = z.union([emailSchema, usernameSchema])

export const signInSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(8),
})

export type SignInDto = z.infer<typeof signInSchema>
