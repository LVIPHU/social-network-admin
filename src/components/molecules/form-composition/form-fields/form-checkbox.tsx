import { useLingui } from '@lingui/react'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { cn } from '@/packages/utils/styles'

import type { CheckboxFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormCheckbox - Wrapper for Checkbox component
 */
export function FormCheckbox({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: CheckboxFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const checked = Boolean(field.state.value)

  const orientation = config.orientation ?? 'vertical'
  const isHorizontal = orientation === 'horizontal'

  return (
    <Field data-invalid={isInvalid} orientation={orientation}>
      <div
        className={cn(
          'flex items-center',
          isHorizontal ? 'flex-row space-x-2' : 'flex-col space-y-2',
        )}
      >
        <Checkbox
          id={name}
          name={name}
          checked={checked}
          onCheckedChange={(checkedChange) => field.handleChange(checkedChange)}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
          disabled={disabled || config.disabled}
        />
        {(config.checkboxLabel || config.label) && (
          <FieldLabel htmlFor={name} className="cursor-pointer">
            {renderTranslatableContent(
              config.checkboxLabel || config.label,
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
