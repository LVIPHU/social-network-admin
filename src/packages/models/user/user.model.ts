import { z } from 'zod'

import { dateSchema } from '@/packages/utils/date.ts'

export const usernameSchema = z
  .string()
  .min(3)
  .max(255)
  .regex(/^[\w.-]+$/, {
    message:
      'Usernames can only contain letters, numbers, periods, hyphens, and underscores.',
  })
  .transform((value) => value.toLowerCase())

export const statusSchema = z.enum(['ACTIVE', 'INACTIVE']).default('INACTIVE')

export const userSchema = z.object({
  user_id: z.string(),
  username: usernameSchema,
  name: z.string().min(1).max(255),
  status: statusSchema.optional(),
  bio: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  website_url: z.string().url().optional().nullable(),
  thumbnail_url: z.string().url().optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  banner_url: z.string().url().optional().nullable(),
  user_stat: z.record(z.string(), z.any()).optional(),
  stat: z.record(z.string(), z.any()).optional(),
  created_at: dateSchema,
  updated_at: dateSchema,
})

export type UserDto = z.infer<typeof userSchema>
