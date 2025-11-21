import { createFileRoute } from '@tanstack/react-router'
import { t } from '@lingui/core/macro'
import SettingsTemplate from '@/components/templates/settings.template.tsx'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <>
      <title>
        {t`Settings`} - {t`TBC Admin`}
      </title>
      <SettingsTemplate />
    </>
  )
}
