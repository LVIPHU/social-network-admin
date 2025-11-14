import { createFileRoute } from '@tanstack/react-router'
import DonationsTemplate from '@/components/templates/donations.template'

export const Route = createFileRoute('/_authenticated/donations/')({
  component: DonationsTemplate,
})
