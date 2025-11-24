import { z } from 'zod'

export const themeSchema = z
  .enum(['system', 'light', 'dark'])

export type ThemeDto = z.infer<typeof themeSchema>
