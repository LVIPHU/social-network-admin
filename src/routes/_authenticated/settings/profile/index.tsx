import { createFileRoute } from '@tanstack/react-router'

import ProfileTemplate from '@/components/templates/profile.template.tsx'

export const Route = createFileRoute('/_authenticated/settings/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  return <ProfileTemplate />
}
