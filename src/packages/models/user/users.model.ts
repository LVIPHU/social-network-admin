import { z } from 'zod'
import { userSchema } from './user.model'

export const usersSchema = z.object({
  pagination: z.object({
    total_rows: z.number(),
    total_pages: z.number(),
    limit: z.number(),
    page: z.number(),
    sort: z.record(z.string(), z.string()).optional(),
  }),
  data: z.array(userSchema),
})

export type UsersDto = z.infer<typeof usersSchema>
