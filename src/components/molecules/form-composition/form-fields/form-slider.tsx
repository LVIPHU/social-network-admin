import { useLingui } from '@lingui/react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Slider } from '@/components/ui/slider'

import type { SliderFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormSlider - Wrapper for Slider component
 */
export function FormSlider({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: SliderFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const value = Array.isArray(field.state.value)
    ? field.state.value
    : typeof field.state.value === 'number'
      ? [field.state.value]
      : [config.min || 0]

  return (
    <Field data-invalid={isInvalid}>
      {config.label && (
        <FieldLabel htmlFor={name}>
          {renderTranslatableContent(config.label, i18n)}
          {config.required && <span className="text-destructive">*</span>}
          {config.showValue && (
            <span className="ml-2 text-muted-foreground">
              {Array.isArray(value) ? value.join(', ') : value}
            </span>
          )}
        </FieldLabel>
      )}
      {config.description && (
        <FieldDescription>
          {renderTranslatableContent(config.description, i18n)}
        </FieldDescription>
      )}
      <Slider
        id={name}
        name={name}
        value={value}
        onValueChange={(values) => {
          field.handleChange(values.length === 1 ? values[0] : values)
        }}
        onBlur={field.handleBlur}
        min={config.min}
        max={config.max}
        step={config.step}
        disabled={disabled || config.disabled}
        className="w-full"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
