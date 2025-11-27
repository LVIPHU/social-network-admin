import { useLingui } from '@lingui/react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import type { InputFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormInput - Wrapper for Input component
 */
export function FormInput({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: InputFieldConfig
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
      <Input
        id={name}
        name={name}
        type={config.inputType || 'text'}
        value={String(field.state.value || '')}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={
          typeof config.placeholder === 'string'
            ? config.placeholder
            : config.placeholder
              ? String(config.placeholder)
              : undefined
        }
        autoComplete={config.autoComplete}
        min={config.min}
        max={config.max}
        step={config.step}
        aria-invalid={isInvalid}
        disabled={disabled || config.disabled}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
