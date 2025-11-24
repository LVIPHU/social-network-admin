import '@/packages/libs/dayjs'

import { i18n } from '@lingui/core'
import { detect, fromStorage, fromUrl } from '@lingui/detect-locale'
import { I18nProvider } from '@lingui/react'
import { useEffect } from 'react'

import { useAuthStore } from '@/stores/auth'
import {
  DEFAULT_LANGUAGE,
  languages,
  type LocaleId,
} from '@/constants/language.constants'
import { dynamicActivate } from '@/packages/libs/lingui'

type Props = {
  children: React.ReactNode
}

export const LocaleProvider = ({ children }: Props) => {
  const userLocale = useAuthStore(
    (state) => state.profile?.locale ?? DEFAULT_LANGUAGE,
  )

  useEffect(() => {
    const detectedLocale =
      detect(
        fromUrl('locale'),
        fromStorage('locale'),
        userLocale,
        DEFAULT_LANGUAGE,
      ) ?? DEFAULT_LANGUAGE

    // Activate the locale only if it's supported
    if (languages.some((lang) => lang.locale === detectedLocale)) {
      void dynamicActivate(detectedLocale)
    } else {
      void dynamicActivate(DEFAULT_LANGUAGE)
    }
  }, [userLocale])

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

export const changeLanguage = (locale: LocaleId) => {
  // Update locale in local storage
  window.localStorage.setItem('locale', locale)

  // Update locale in user profile, if authenticated
  const state = useAuthStore.getState()
  if (state.profile) state.setProfile({ ...state.profile, locale })

  // Reload the page for language switch to take effect
  window.location.reload()
}
