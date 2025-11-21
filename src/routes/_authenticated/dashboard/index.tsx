import { createFileRoute } from '@tanstack/react-router'
import { t } from '@lingui/core/macro'
import DashboardTemplate from '@/components/templates/dashboard.template'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <>
      <title>
        {t`Dashboard`} - {t`TBC Admin`}
      </title>
      <DashboardTemplate />
    </>
  )
}
