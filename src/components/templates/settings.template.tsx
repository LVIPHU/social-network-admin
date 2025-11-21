import { Trans } from '@lingui/react/macro'
import { H1 } from '@/components/atoms/heading.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'

export default function SettingsTemplate() {
  return (
    <>
      <div>
        <H1>
          <Trans>Setting</Trans>
        </H1>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
        <div className="space-y-6">
        </div>
      </ScrollArea>
    </>
  )
}
