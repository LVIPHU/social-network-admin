import { createFileRoute } from '@tanstack/react-router'

import SettingsLayout from '@/components/templates/layouts/settings.layout.tsx'

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsLayout,
})
