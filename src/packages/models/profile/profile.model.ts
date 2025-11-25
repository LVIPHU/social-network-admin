import type { z } from 'zod'

import { DEFAULT_LANGUAGE } from '@/constants/language.constants.ts'
import { adminSchema } from '@/packages/models/admin/admin.model'
import { languageSchema } from '@/packages/models/app/language.model'

export const profileSchema = adminSchema.omit({ password: true }).extend({
  locale: languageSchema.default(DEFAULT_LANGUAGE),
})

export type ProfileDto = z.infer<typeof profileSchema>
