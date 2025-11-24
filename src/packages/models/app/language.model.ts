import { z } from 'zod'
import { localeIds } from '@/constants/language.constants.ts'

export const languageSchema = z.enum(localeIds)

export type LanguageDto = z.infer<typeof languageSchema>
