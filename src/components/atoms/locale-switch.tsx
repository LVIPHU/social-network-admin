import { t } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'
import { LanguagesIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import { changeLanguage } from '@/providers/locale.provider.tsx'

import { LocaleCombobox } from './locale-combobox.tsx'

export const LocaleSwitch = () => {
  const { i18n } = useLingui()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" aria-label={t`Change Language`}>
          <LanguagesIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <LocaleCombobox
          value={i18n.locale}
          onValueChange={(id) => {
            changeLanguage(id)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
