import '@/packages/libs/dayjs'

import { i18n } from '@lingui/core'
import { detect, fromStorage, fromUrl } from '@lingui/detect-locale'
import { I18nProvider } from '@lingui/react'
import { useEffect } from 'react'

import type { LocaleId } from '@/constants/language.constants'
import { DEFAULT_LANGUAGE, languages } from '@/constants/language.constants'
import { dynamicActivate } from '@/packages/libs/lingui'
import { configureZodLocale } from '@/packages/libs/zod'
import { useAuthStore } from '@/stores/auth'

type Props = {
  children: React.ReactNode
}

export const LocaleProvider = ({ children }: Props) => {
  const userLocale = useAuthStore(
    (state) => state.profile?.locale ?? DEFAULT_LANGUAGE,
  )

  useEffect(() => {
    async function activateLocale() {
      const detectedLocale =
        detect(
          fromUrl('locale'),
          fromStorage('locale'),
          userLocale,
          DEFAULT_LANGUAGE,
        ) ?? DEFAULT_LANGUAGE

      // Activate the locale only if it's supported
      const localeToActivate = languages.some(
        (lang) => lang.id === detectedLocale,
      )
        ? detectedLocale
        : DEFAULT_LANGUAGE

      try {
        await dynamicActivate(localeToActivate)
        await configureZodLocale(localeToActivate)
      } catch (error) {
        console.error('Failed to activate locale:', error)
        // Fallback to default locale
        try {
          await dynamicActivate(DEFAULT_LANGUAGE)
          await configureZodLocale(DEFAULT_LANGUAGE)
        } catch (fallbackError) {
          console.error('Failed to activate default locale:', fallbackError)
        }
      }
    }

    void activateLocale()
  }, [userLocale])

  // i18n is already initialized in main.tsx, so I18nProvider can render immediately
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
