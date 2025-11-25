import { createFileRoute } from '@tanstack/react-router'

import DashboardTemplate from '@/components/templates/dashboard.template'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <>
      <DashboardTemplate />
    </>
  )
}
