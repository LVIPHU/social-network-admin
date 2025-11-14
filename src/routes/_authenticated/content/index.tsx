import { createFileRoute } from '@tanstack/react-router'
import ContentTemplate from '@/components/templates/content.template'

export const Route = createFileRoute('/_authenticated/content/')({
  component: ContentTemplate,
})