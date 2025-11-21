import { createFileRoute } from '@tanstack/react-router'
import SignInForm from '@/components/organisms/forms/sign-in.form.tsx'

export const Route = createFileRoute('/auth/sign-in/')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || undefined,
    }
  },
  component: SignInForm,
})
