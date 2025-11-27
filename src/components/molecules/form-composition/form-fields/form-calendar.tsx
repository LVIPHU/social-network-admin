import { useLingui } from '@lingui/react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/packages/utils/styles'

import type { CalendarFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormCalendar - Wrapper for Calendar component with Popover
 */
export function FormCalendar({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: CalendarFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const [open, setOpen] = useState(false)

  const isRange = config.mode === 'range'

  // Parse date value from field state
  let date: Date | DateRange | null = null
  if (field.state.value) {
    if (isRange) {
      // Range mode: value must be DateRange
      const rangeValue = field.state.value as DateRange | undefined
      date = rangeValue ?? null
    } else {
      // Single mode: value can be string, Date, or null
      if (typeof field.state.value === 'string') {
        date = new Date(field.state.value)
      } else if (field.state.value instanceof Date) {
        date = field.state.value
      } else {
        date = null
      }
    }
  }

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return ''
    if (!range.to) return format(range.from, 'PPP')
    return `${format(range.from, 'PPP')} - ${format(range.to, 'PPP')}`
  }

  return (
    <Field data-invalid={isInvalid}>
      {config.label && (
        <FieldLabel htmlFor={name}>
          {renderTranslatableContent(config.label, i18n)}
          {config.required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      {config.description && (
        <FieldDescription>
          {renderTranslatableContent(config.description, i18n)}
        </FieldDescription>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
            disabled={disabled || config.disabled}
            aria-invalid={isInvalid}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date ? (
              isRange ? (
                formatDateRange(date as DateRange)
              ) : (
                format(date as Date, 'PPP')
              )
            ) : (
              <span>
                {typeof config.placeholder === 'string'
                  ? config.placeholder
                  : config.placeholder
                    ? i18n._(config.placeholder)
                    : 'Pick a date'}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {isRange ? (
            <Calendar
              mode="range"
              selected={date as DateRange | undefined}
              onSelect={(selectedDate: DateRange | undefined) => {
                field.handleChange(selectedDate)
              }}
              initialFocus
              required
            />
          ) : (
            <Calendar
              mode="single"
              selected={date as Date | undefined}
              onSelect={(selectedDate: Date | undefined) => {
                field.handleChange(selectedDate)
                setOpen(false)
              }}
              initialFocus
            />
          )}
        </PopoverContent>
      </Popover>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
