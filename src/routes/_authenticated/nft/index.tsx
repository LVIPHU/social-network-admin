import { createFileRoute } from '@tanstack/react-router'
import NftTemplate from '@/components/templates/nft.template'

export const Route = createFileRoute('/_authenticated/nft/')({
  component: NftTemplate,
})
