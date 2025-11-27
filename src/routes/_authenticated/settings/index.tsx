import { createFileRoute } from '@tanstack/react-router'

import SettingsTemplate from '@/components/templates/settings.template.tsx'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return <SettingsTemplate />
}
