import { t } from '@lingui/core/macro'
import { fromStorage } from '@lingui/detect-locale'
import { Trans } from '@lingui/react/macro'
import { useForm, useStore } from '@tanstack/react-form'
import { z } from 'zod'

import { LocaleComboboxPopover } from '@/components/atoms/locale-combobox.tsx'
import type { ComboboxFieldConfig } from '@/components/molecules/form-composition'
import { FormCombobox } from '@/components/molecules/form-composition/form-fields'
import { Button } from '@/components/ui/button.tsx'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field.tsx'
import { DEFAULT_LANGUAGE, localeIds } from '@/constants/language.constants.ts'
import type { LocaleId } from '@/constants/language.constants.ts'
import type { LanguageDto } from '@/packages/models/app'
import { languageSchema, themeSchema } from '@/packages/models/app'
import { cn } from '@/packages/utils/styles.ts'
import { changeLanguage } from '@/providers/locale.provider.tsx'
import { useTheme } from '@/providers/theme.provider.tsx'
import { useProfile } from '@/services/profile'

const formSchema = z.object({
  theme: themeSchema,
  locale: languageSchema,
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm = () => {
  const { profile, loading } = useProfile()
  const { theme, setTheme } = useTheme()

  // Get locale from localStorage, validate it's a valid LocaleId, fallback to profile locale or default
  const storedLocale = fromStorage('locale')
  const localeFromStorage: LocaleId =
    storedLocale && localeIds.includes(storedLocale as LocaleId)
      ? (storedLocale as LocaleId)
      : (profile?.locale ?? DEFAULT_LANGUAGE)

  const defaultValues: SettingsFormValues = {
    theme: theme,
    locale: localeFromStorage,
  }

  const form = useForm({
    defaultValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit: ({ value }) => {
      if (!profile) return

      setTheme(value.theme)

      if (profile.locale !== value.locale) {
        changeLanguage(value.locale)
      }
    },
  })

  const { isDirty, isDefaultValue } = useStore(form.store, (state) => ({
    isDirty: state.isDirty,
    isDefaultValue: state.isDefaultValue,
  }))

  const themeFieldConfig: ComboboxFieldConfig = {
    type: 'combobox',
    name: 'theme',
    label: t`Theme`,
    options: [
      { label: t`System`, value: 'system' },
      { label: t`Light`, value: 'light' },
      { label: t`Dark`, value: 'dark' },
    ],
  }

  return (
    <form
      id="setting-app-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="grid gap-6 sm:grid-cols-2">
        {/* Theme field using FormComposition pattern */}
        <form.Field
          name="theme"
          children={(field) => (
            <FormCombobox
              name="theme"
              field={field}
              config={themeFieldConfig}
              disabled={loading}
            />
          )}
        />

        {/* Custom locale field with LocaleComboboxPopover */}
        <form.Field
          name="locale"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Language</Trans>
                </FieldLabel>
                <LocaleComboboxPopover
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onValueChange={(value) => {
                    field.handleChange(value as LanguageDto)
                  }}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        {/* Buttons */}
        <div
          className={cn(
            'hidden items-center space-x-2 self-center sm:col-start-2',
            isDirty && !isDefaultValue && 'flex animate-in fade-in',
          )}
        >
          <Button
            type="submit"
            disabled={loading || !isDirty || isDefaultValue}
          >
            <Trans>Save Changes</Trans>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => form.reset()}
            disabled={loading || !isDirty || isDefaultValue}
          >
            <Trans>Discard</Trans>
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
