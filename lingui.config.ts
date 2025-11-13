import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  format: 'po',
  sourceLocale: 'en',
  fallbackLocales: { default: 'en' },
  locales: ['en', 'vi', 'zh-Hans', 'zh-Hant'],
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
}

export default config
