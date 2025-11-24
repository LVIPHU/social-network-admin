import { z } from 'zod'

export const paginationSchema = z.object({
  total_rows: z.number(),
  total_pages: z.number(),
  limit: z.number(),
  page: z.number(),
  sort: z.record(z.string(), z.string()).optional(),
})

export type PaginationDto = z.infer<typeof paginationSchema>
