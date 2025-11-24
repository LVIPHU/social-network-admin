import type { z } from 'zod'
import { adminSchema } from '@/packages/models/admin/admin.model.ts'
import { languageSchema } from '@/packages/models'
import { DEFAULT_LANGUAGE } from '@/constants/language.constants.ts'

export const profileSchema = adminSchema.omit({ password: true }).extend({
  locale: languageSchema.default(DEFAULT_LANGUAGE),
})

export type ProfileDto = z.infer<typeof profileSchema>
