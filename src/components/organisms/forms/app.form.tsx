import { z } from 'zod'
import { Trans } from '@lingui/react/macro'
import { useForm, useStore } from '@tanstack/react-form'
import { t } from '@lingui/core/macro'
import type { LanguageDto, ThemeDto } from '@/packages/models'
import { useTheme } from '@/providers/theme.provider.tsx'
import { useProfile } from '@/services/profile'
import { H2 } from '@/components/atoms/heading.tsx'
import { languageSchema, themeSchema } from '@/packages/models'
import { DEFAULT_LANGUAGE } from '@/constants/language.constants.ts'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field.tsx'
import { Combobox } from '@/components/ui/combobox.tsx'
import { cn } from '@/packages/utils/styles.ts'
import { Button } from '@/components/ui/button.tsx'
import { LocaleComboboxPopover } from '@/components/atoms/locale-combobox.tsx'

const formSchema = z.object({
  theme: themeSchema,
  locale: languageSchema,
})

export const AppSettings = () => {
  const { profile, loading } = useProfile()
  const { theme, setTheme } = useTheme()

  const form = useForm({
    defaultValues: {
      theme: theme,
      locale: profile?.locale || DEFAULT_LANGUAGE,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: ({ value }) => {
      if (!profile) return

      setTheme(value.theme)

      if (profile.locale !== value.locale) {
        window.localStorage.setItem('locale', value.locale)
        window.location.reload()
      }
    },
  })

  const { isDirty, isDefaultValue } = useStore(form.store, (state) => state)

  return (
    <div className="space-y-6">
      <div>
        <H2>
          <Trans>App</Trans>
        </H2>
        <p className="leading-relaxed opacity-75">
          <Trans>
            Here, you can update your app to customize and personalize your
            experience.
          </Trans>
        </p>
      </div>
      <form
        id="setting-app-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup className="grid gap-6 sm:grid-cols-2">
          <form.Field
            name="theme"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    <Trans>Theme</Trans>
                  </FieldLabel>
                  <Combobox
                    id={field.name}
                    name={field.name}
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onValueChange={(value) => {
                      field.handleChange(value as ThemeDto)
                    }}
                    options={[
                      { label: t`System`, value: 'system' },
                      { label: t`Light`, value: 'light' },
                      { label: t`Dark`, value: 'dark' },
                    ]}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  {field.state.meta.isDirty}
                </Field>
              )
            }}
          />
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
                  {field.state.meta.isDirty}
                </Field>
              )
            }}
          />
          <div
            className={cn(
              'hidden items-center space-x-2 self-center sm:col-start-2',
              isDirty && !isDefaultValue && 'flex animate-in fade-in',
            )}
          >
            <Button type="submit" disabled={loading}>
              <Trans>Save Changes</Trans>
            </Button>
            <Button type="reset" variant="ghost" onClick={() => form.reset()}>
              <Trans>Discard</Trans>
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}
