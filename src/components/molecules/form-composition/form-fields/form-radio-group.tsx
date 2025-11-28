import { useLingui } from '@lingui/react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import type { RadioGroupFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormRadioGroup - Wrapper for RadioGroup component
 */
export function FormRadioGroup({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: RadioGroupFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      {config.label && (
        <FieldLabel>
          {renderTranslatableContent(config.label, i18n)}
          {config.required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      {config.description && (
        <FieldDescription>
          {renderTranslatableContent(config.description, i18n)}
        </FieldDescription>
      )}
      <RadioGroup
        value={String(field.state.value || '')}
        onValueChange={(value) => field.handleChange(value)}
        disabled={disabled || config.disabled}
        className={
          config.orientation === 'horizontal'
            ? 'flex flex-row gap-4'
            : 'flex flex-col gap-3'
        }
      >
        {config.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              disabled={option.disabled}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {renderTranslatableContent(option.label, i18n)}
            </label>
          </div>
        ))}
      </RadioGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
