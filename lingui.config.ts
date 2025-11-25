import type { LinguiConfig } from '@lingui/conf'

import {
  DEFAULT_LANGUAGE,
  localeIds,
} from './src/constants/language.constants.ts'

const config: LinguiConfig = {
  format: 'po',
  sourceLocale: DEFAULT_LANGUAGE,
  fallbackLocales: { default: DEFAULT_LANGUAGE },
  locales: localeIds,
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
}

export default config
