import { useLingui } from '@lingui/react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

import type { TextareaFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormTextarea - Wrapper for Textarea component
 */
export function FormTextarea({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: TextareaFieldConfig
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
      <Textarea
        id={name}
        name={name}
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
        rows={config.rows}
        maxLength={config.maxLength}
        aria-invalid={isInvalid}
        disabled={disabled || config.disabled}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
