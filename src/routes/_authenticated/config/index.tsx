import { createFileRoute } from '@tanstack/react-router'
import ConfigTemplate from '@/components/templates/config.template'

export const Route = createFileRoute('/_authenticated/config/')({
  component: ConfigTemplate,
})
