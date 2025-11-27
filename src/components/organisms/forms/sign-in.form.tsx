import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { FormComposition } from '@/components/molecules/form-composition'
import type { FormFieldConfig } from '@/components/molecules/form-composition'
import { Button } from '@/components/ui/button.tsx'
import { Field, FieldDescription } from '@/components/ui/field.tsx'
import { signInSchema } from '@/packages/models/auth'
import { cn } from '@/packages/utils/styles.ts'
import { useSignIn } from '@/services/auth/sign-in.ts'

type SignInFormValues = {
  identifier: string
  password: string
}

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { signIn, loading } = useSignIn()
  const [formState, setFormState] = useState<{
    isDirty: boolean
    isDefaultValue: boolean
  }>({
    isDirty: false,
    isDefaultValue: true,
  })

  const fields: Array<FormFieldConfig> = [
    {
      type: 'input',
      name: 'identifier',
      label: t`Username`,
      inputType: 'text',
      placeholder: t`m@example.com`,
      autoComplete: 'off',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: t`Password`,
      placeholder: t`Enter password`,
      autoComplete: 'off',
      required: true,
    },
  ]

  const handleSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values)
    } catch (err) {
      // Error is handled by axios interceptor
      console.error('Login error:', err)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">
          <Trans>Sign in to your account</Trans>
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          <Trans>Enter your username below to sign in to your account</Trans>
        </p>
      </div>

      <FormComposition
        fields={fields}
        defaultValues={{ identifier: '', password: '' }}
        onSubmit={handleSubmit}
        schema={signInSchema}
        loading={loading}
        formId="sign-in-form"
        showButtons={false}
        onFormStateChange={(state) => {
          setFormState({
            isDirty: state.isDirty,
            isDefaultValue: state.isDefaultValue,
          })
        }}
        className="gap-6"
      />

      <Field>
        <Button
          type="submit"
          form="sign-in-form"
          disabled={loading || !formState.isDirty || formState.isDefaultValue}
        >
          {loading ? <Trans>Signing in...</Trans> : <Trans>Sign in</Trans>}
        </Button>
      </Field>

      <Field>
        <FieldDescription className="text-center">
          <Trans>Don't have an account?</Trans>{' '}
          <Link to="/auth/sign-up" className="underline underline-offset-4">
            <Trans>Sign up</Trans>
          </Link>
        </FieldDescription>
      </Field>
    </div>
  )
}
