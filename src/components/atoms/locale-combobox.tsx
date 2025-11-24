import { t } from '@lingui/core/macro'
import fuzzy from 'fuzzy'
import { useMemo, useState } from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type { Language, LocaleId } from '@/constants/language.constants.ts'
import { cn } from '@/packages/utils/styles.ts'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { languages } from '@/constants/language.constants.ts'

interface Props extends React.ComponentProps<'input'> {
  value: string
  onValueChange: (id: LocaleId) => void
}

export const LocaleCombobox = ({ value, onValueChange, ...rest }: Props) => {
  const [search, setSearch] = useState('')

  const options = useMemo(() => {
    return fuzzy.filter(search, languages, {
      extract: (lang: Language) => `${lang.subname} ${lang.locale}`,
    })
  }, [search])

  return (
    <Command shouldFilter={false}>
      <CommandInput
        value={search}
        placeholder={t`Search for a language`}
        onValueChange={setSearch}
        {...rest}
      />
      <CommandList>
        <CommandEmpty>{t`No results found`}</CommandEmpty>
        <CommandGroup>
          <ScrollArea>
            <div className="max-h-60">
              {options.map((option) => (
                <CommandItem
                  key={option.original.id}
                  disabled={false}
                  value={option.original.id.trim()}
                  onSelect={(selectedValue) => {
                    const result = options.find(
                      ({ original }) => original.id.trim() === selectedValue,
                    )

                    if (!result) return null

                    onValueChange(result.original.id)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 size-4 opacity-0',
                      value === option.original.id && 'opacity-100',
                    )}
                  />
                  {option.original.subname}{' '}
                  <span className="ml-1 text-xs opacity-50">
                    ({option.original.locale})
                  </span>
                </CommandItem>
              ))}
            </div>
          </ScrollArea>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const LocaleComboboxPopover = ({
  value,
  onValueChange,
  ...rest
}: Props) => {
  const [open, setOpen] = useState(false)

  const selected = useMemo(() => {
    return languages.find((lang) => lang.id === value)
  }, [value])

  const onSelect = (selectedValue: LocaleId) => {
    onValueChange(selectedValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          aria-expanded={open}
          className="w-full justify-between hover:bg-secondary/20 active:scale-100"
        >
          <span className="line-clamp-1 text-left font-normal">
            {selected?.subname}{' '}
            <span className="ml-1 text-xs opacity-50">
              ({selected?.locale})
            </span>
          </span>
          <ChevronDownIcon
            className={cn(
              'ml-2 size-4 shrink-0 rotate-0 opacity-50 transition-transform',
              open && 'rotate-180',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <LocaleCombobox value={value} onValueChange={onSelect} {...rest} />
      </PopoverContent>
    </Popover>
  )
}
