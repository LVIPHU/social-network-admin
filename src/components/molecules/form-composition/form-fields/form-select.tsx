import { useLingui } from '@lingui/react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { SelectFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormSelect - Wrapper for Select component
 */
export function FormSelect({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: SelectFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

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
      <Select
        value={String(field.state.value || '')}
        onValueChange={(value) => field.handleChange(value)}
        disabled={disabled || config.disabled}
      >
        <SelectTrigger id={name} aria-invalid={isInvalid}>
          <SelectValue
            placeholder={
              typeof config.placeholder === 'string'
                ? config.placeholder
                : config.placeholder
                  ? i18n._(config.placeholder)
                  : 'Select an option'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {config.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {renderTranslatableContent(option.label, i18n)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
