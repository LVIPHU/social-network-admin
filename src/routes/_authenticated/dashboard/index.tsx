import { createFileRoute } from '@tanstack/react-router'
import DashboardTemplate from '@/components/templates/dashboard.template'
import { Helmet } from 'react-helmet-async'
import { t } from '@lingui/core/macro'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>
          {t`Dashboard`} - {t`TBC Admin`}
        </title>
      </Helmet>
      <DashboardTemplate />
    </>
  )
}