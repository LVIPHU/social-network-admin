import { Trans } from '@lingui/react/macro'

import { H4 } from '@/components/atoms/heading.tsx'
import { SettingsForm } from '@/components/organisms/forms/settings.form.tsx'
import LayoutControls from '@/components/organisms/layout-controls.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'

export default function SettingsTemplate() {
  return (
    <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)] w-full">
      <div className="flex flex-col gap-6">
        <div>
          <H4>
            <Trans>General</Trans>
          </H4>
          <p className="leading-relaxed opacity-75">
            <Trans>Settings and options for your application</Trans>
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:max-w-xl">
          <SettingsForm />
          <LayoutControls />
        </div>
      </div>
    </ScrollArea>
  )
}
