import { DatabaseIcon } from 'lucide-react'
import { Trans } from '@lingui/react/macro'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty.tsx'

export default function DataTableEmpty() {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <DatabaseIcon className="size-6" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>
          <Trans>No data found</Trans>
        </EmptyTitle>
        <EmptyDescription>
          <Trans>
            No data match your search criteria. Try adjusting your search or
            filters.
          </Trans>
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}