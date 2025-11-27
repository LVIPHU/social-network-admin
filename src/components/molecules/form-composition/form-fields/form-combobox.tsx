import { useLingui } from '@lingui/react'

import { Combobox } from '@/components/ui/combobox'
import type { ComboboxOption } from '@/components/ui/combobox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

import type { ComboboxFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormCombobox - Wrapper for Combobox component
 */
export function FormCombobox({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: ComboboxFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  const options: Array<ComboboxOption> = config.options.map((opt) => ({
    value: opt.value,
    label: renderTranslatableContent(opt.label, i18n),
  }))

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
      {config.multiple ? (
        <Combobox
          id={name}
          name={name}
          options={options}
          multiple={true}
          clearable={config.clearable}
          value={
            Array.isArray(field.state.value)
              ? (field.state.value as Array<string>)
              : []
          }
          onValueChange={(value: Array<string>) => field.handleChange(value)}
          selectPlaceholder={
            typeof config.selectPlaceholder === 'string'
              ? config.selectPlaceholder
              : config.selectPlaceholder
                ? i18n._(config.selectPlaceholder)
                : undefined
          }
          searchPlaceholder={
            typeof config.searchPlaceholder === 'string'
              ? config.searchPlaceholder
              : config.searchPlaceholder
                ? i18n._(config.searchPlaceholder)
                : undefined
          }
          emptyText={
            typeof config.emptyText === 'string'
              ? config.emptyText
              : config.emptyText
                ? i18n._(config.emptyText)
                : undefined
          }
          aria-invalid={isInvalid}
          disabled={disabled || config.disabled}
        />
      ) : (
        <Combobox
          id={name}
          name={name}
          options={options}
          multiple={false}
          clearable={config.clearable}
          value={String(field.state.value || '')}
          onValueChange={(value: string) => field.handleChange(value)}
          selectPlaceholder={
            typeof config.selectPlaceholder === 'string'
              ? config.selectPlaceholder
              : config.selectPlaceholder
                ? i18n._(config.selectPlaceholder)
                : undefined
          }
          searchPlaceholder={
            typeof config.searchPlaceholder === 'string'
              ? config.searchPlaceholder
              : config.searchPlaceholder
                ? i18n._(config.searchPlaceholder)
                : undefined
          }
          emptyText={
            typeof config.emptyText === 'string'
              ? config.emptyText
              : config.emptyText
                ? i18n._(config.emptyText)
                : undefined
          }
          aria-invalid={isInvalid}
          disabled={disabled || config.disabled}
        />
      )}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
