import { createFileRoute } from '@tanstack/react-router'
import SignInForm from '@/components/organisms/forms/sign-in.form.tsx'
import { Helmet } from 'react-helmet-async'
import { t } from '@lingui/core/macro'

export const Route = createFileRoute('/auth/sign-in/')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || undefined,
    }
  },
  component: SignInPage,
})

function SignInPage() {
  return (
    <>
      <Helmet>
        <title>
          {t`Sign in to your account`} - {t`TBC Admin`}
        </title>
      </Helmet>
      <SignInForm />
    </>
  )
}
