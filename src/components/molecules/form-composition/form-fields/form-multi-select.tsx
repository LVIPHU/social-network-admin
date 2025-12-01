import { useLingui } from '@lingui/react'
import { useRef } from 'react'

import { MultiSelect } from '@/components/atoms/multi-select'
import type {
  MultiSelectOption,
  MultiSelectRef,
} from '@/components/atoms/multi-select'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

import type { MultiSelectFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormMultiSelect - Wrapper for MultiSelect component
 */
export function FormMultiSelect({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: MultiSelectFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const multiSelectRef = useRef<MultiSelectRef>(null)

  // Convert options to MultiSelectOption format
  const options: Array<MultiSelectOption> = config.options.map((opt) => ({
    label:
      typeof opt.label === 'string'
        ? opt.label
        : i18n._(opt.label as Parameters<typeof i18n._>[0]),
    value: opt.value,
    disabled: opt.disabled,
  }))

  // Get current value as array
  const value = Array.isArray(field.state.value)
    ? field.state.value
    : field.state.value
      ? [String(field.state.value)]
      : []

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
      <MultiSelect
        ref={multiSelectRef}
        options={options}
        defaultValue={value}
        onValueChange={(values: Array<string>) => {
          field.handleChange(values)
        }}
        placeholder={
          typeof config.placeholder === 'string'
            ? config.placeholder
            : config.placeholder
              ? i18n._(config.placeholder)
              : 'Select options'
        }
        disabled={disabled || config.disabled}
        variant={config.variant}
        maxCount={config.maxCount}
        searchable={config.searchable}
        emptyIndicator={config.emptyIndicator}
        {...(config.multiSelectProps || {})}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
