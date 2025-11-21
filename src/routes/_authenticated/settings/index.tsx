import { createFileRoute } from '@tanstack/react-router'
import SettingsTemplate from '@/components/templates/settings.template.tsx'
import { Helmet } from 'react-helmet-async'
import { t } from '@lingui/core/macro'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>
          {t`Settings`} - {t`TBC Admin`}
        </title>
      </Helmet>
      <SettingsTemplate />
    </>
  )
}
