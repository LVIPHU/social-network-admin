import { createFileRoute } from '@tanstack/react-router'
import { t } from '@lingui/core/macro'
import SignInForm from '@/components/organisms/forms/sign-in.form.tsx'

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
      <title>
        {t`Sign in to your account`} - {t`TBC Admin`}
      </title>
      <SignInForm />
    </>
  )
}
