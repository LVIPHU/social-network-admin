import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { cn } from '@/packages/utils/styles.ts'

import { Button } from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type ComboboxOption = {
  value: string
  label: React.ReactNode
}

type ComboboxPropsSingle = {
  options: Array<ComboboxOption>
  emptyText?: string
  clearable?: boolean
  selectPlaceholder?: string
  searchPlaceholder?: string
  multiple?: false
  value?: string
  onValueChange?: (value: string) => void
}

type ComboboxPropsMultiple = {
  options: Array<ComboboxOption>
  emptyText?: string
  clearable?: boolean
  selectPlaceholder?: string
  searchPlaceholder?: string
  multiple: true
  value?: Array<string>
  onValueChange?: (value: Array<string>) => void
}

export type ComboboxProps = (ComboboxPropsSingle | ComboboxPropsMultiple) &
  React.ComponentProps<'input'>

const handleSingleSelect = (
  props: ComboboxPropsSingle,
  option: ComboboxOption,
) => {
  if (props.clearable) {
    props.onValueChange?.(option.value === props.value ? '' : option.value)
  } else {
    props.onValueChange?.(option.value)
  }
}

const handleMultipleSelect = (
  props: ComboboxPropsMultiple,
  option: ComboboxOption,
) => {
  if (props.value?.includes(option.value)) {
    if (!props.clearable && props.value.length === 1) return false
    props.onValueChange?.(props.value.filter((value) => value !== option.value))
  } else {
    props.onValueChange?.([...(props.value ?? []), option.value])
  }
}

export const Combobox = forwardRef(
  (props: ComboboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      multiple,
      value,
      options,
      selectPlaceholder,
      searchPlaceholder,
      emptyText,
      onValueChange,
      clearable,
      ...rest
    } = props
    const [open, setOpen] = useState(false)

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
              {multiple && value && value.length > 0 && (
                <span className="mr-2">{value.join(', ')}</span>
              )}

              {!multiple &&
                value &&
                value !== '' &&
                options.find((option) => option.value === value)?.label}

              {!value ||
                (value.length === 0 &&
                  (selectPlaceholder ?? 'Select an option'))}
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
          <Command>
            <CommandInput
              {...rest}
              ref={ref}
              placeholder={searchPlaceholder ?? 'Search for an option'}
            />
            <CommandList>
              <CommandEmpty>{emptyText ?? 'No results found'}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value.toLowerCase().trim()}
                    onSelect={(selectedValue) => {
                      const selectedOption = options.find(
                        (selected) =>
                          selected.value.toLowerCase().trim() === selectedValue,
                      )

                      if (!selectedOption) return null

                      if (multiple) {
                        handleMultipleSelect(props, selectedOption)
                      } else {
                        handleSingleSelect(props, selectedOption)

                        setOpen(false)
                      }
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 size-4 opacity-0',
                        !multiple && value === option.value && 'opacity-100',
                        multiple &&
                          value?.includes(option.value) &&
                          'opacity-100',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)
