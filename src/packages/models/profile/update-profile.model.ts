import { profileSchema } from './profile.model.ts'
import type { z } from 'zod'

export const updateProfileSchema = profileSchema.partial().pick({
  username: true,
  name: true,
  bio: true,
  location: true,
  website_url: true,
  thumbnail_url: true,
  avatar_url: true,
  banner_url: true,
})

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>
