import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in/')({
  component: SignIn,
})

export default function SignIn() {
  return <div>Signin</div>;
}