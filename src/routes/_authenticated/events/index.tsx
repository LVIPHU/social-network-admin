import { createFileRoute } from '@tanstack/react-router'
import EventsTemplate from '@/components/templates/events.template'

export const Route = createFileRoute('/_authenticated/events/')({
  component: EventsTemplate,
})
