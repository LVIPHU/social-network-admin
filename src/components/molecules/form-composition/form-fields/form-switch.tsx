import { useLingui } from '@lingui/react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'

import type { SwitchFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormSwitch - Wrapper for Switch component
 */
export function FormSwitch({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: SwitchFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const checked = Boolean(field.state.value)

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <div className="flex items-center space-x-2">
        <Switch
          id={name}
          name={name}
          checked={checked}
          onCheckedChange={(checked) => field.handleChange(checked)}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
          disabled={disabled || config.disabled}
        />
        {(config.switchLabel || config.label) && (
          <FieldLabel htmlFor={name} className="cursor-pointer">
            {renderTranslatableContent(
              config.switchLabel || config.label,
              i18n,
            )}
            {config.required && <span className="text-destructive">*</span>}
          </FieldLabel>
        )}
      </div>
      {config.description && (
        <FieldDescription>
          {renderTranslatableContent(config.description, i18n)}
        </FieldDescription>
      )}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
