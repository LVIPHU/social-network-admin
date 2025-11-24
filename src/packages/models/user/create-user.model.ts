import { userSchema } from './user.model.ts'
import type { z } from 'zod'

export const createUserSchema = userSchema.partial().pick({
  username: true,
  name: true,
  bio: true,
  location: true,
  website_url: true,
  thumbnail_url: true,
  avatar_url: true,
  banner_url: true,
})

export type CreateUserDto = z.infer<typeof createUserSchema>
