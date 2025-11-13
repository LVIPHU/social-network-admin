import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-up/')({
  component: SignUp,
})

export default function SignUp() {
  return <div>Sign Up</div>
}
