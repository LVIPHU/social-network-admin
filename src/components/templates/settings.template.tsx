import { Trans } from '@lingui/react/macro'
import { H1 } from '@/components/atoms/heading.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { AppSettings } from '@/components/organisms/forms/app.form.tsx'

export default function SettingsTemplate() {
  return (
    <div className="max-w-2xl space-y-4">
      <H1>
        <Trans>Setting</Trans>
      </H1>

      <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
        <div className="space-y-6">
          <AppSettings />
        </div>
      </ScrollArea>
    </div>
  )
}
