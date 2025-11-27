import * as z from 'zod'

/**
 * Map Lingui locale IDs to Zod locale loaders
 * Keys must match LocaleId type from language.constants.ts
 * Each loader returns a Zod locale configuration function
 */
export const zodLocales: Record<
  string,
  () => Promise<() => Parameters<typeof z.config>[0]>
> = {
  en: async () => {
    const locales = await import('zod/locales')
    return locales.en
  },
  vi: async () => {
    const locales = await import('zod/locales')
    return locales.vi
  },
  'zh-Hans': async () => {
    const locales = await import('zod/locales')
    return locales.zhCN
  },
  'zh-Hant': async () => {
    const locales = await import('zod/locales')
    return locales.zhTW
  },
}

/**
 * Load and configure Zod locale
 * @param linguiLocale - Locale ID from Lingui (en, vi, zh-Hans, zh-Hant)
 */
export async function configureZodLocale(linguiLocale: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (zodLocales[linguiLocale]) {
      const localeFn = await zodLocales[linguiLocale]()
      z.config(localeFn())
    } else {
      // Fallback to English if locale not found
      const localeFn = await zodLocales.en()
      z.config(localeFn())
      console.warn(
        `Zod locale not found for: ${linguiLocale}, falling back to English`,
      )
    }
  } catch (error) {
    console.warn(`Failed to load Zod locale: ${linguiLocale}`, error)
    // Fallback to English
    try {
      const localeFn = await zodLocales.en()
      z.config(localeFn())
    } catch {
      // If even English fails, Zod will use default messages
      console.warn('Failed to load default Zod locale (en)')
    }
  }
}

/**
 * Initialize Zod with default locale (English)
 */
export async function initializeZod() {
  await configureZodLocale('en')
}
