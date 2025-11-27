import { useLingui } from '@lingui/react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

import type { InputGroupFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormInputGroup - Wrapper for InputGroup component
 */
export function FormInputGroup({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: InputGroupFieldConfig
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
      <InputGroup>
        {config.addons?.map((addon, index) => {
          if (addon.type === 'text') {
            return (
              <InputGroupAddon
                key={index}
                align={addon.align || 'inline-start'}
              >
                {typeof addon.content === 'object' &&
                addon.content !== null &&
                'label' in addon.content
                  ? addon.content.label
                  : addon.content}
              </InputGroupAddon>
            )
          }
          if (addon.type === 'button') {
            const buttonProps =
              typeof addon.content === 'object' &&
              addon.content !== null &&
              'onClick' in addon.content
                ? addon.content
                : {
                    label: addon.content,
                    onClick: undefined,
                    icon: undefined,
                  }
            return (
              <InputGroupAddon key={index} align={addon.align || 'inline-end'}>
                <InputGroupButton
                  onClick={buttonProps.onClick}
                  variant="ghost"
                  size="icon-xs"
                  type="button"
                >
                  {buttonProps.icon || (buttonProps.label as React.ReactNode)}
                </InputGroupButton>
              </InputGroupAddon>
            )
          }
          return null
        })}
        <InputGroupInput
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
                ? i18n._(config.placeholder)
                : undefined
          }
          autoComplete={config.autoComplete}
          aria-invalid={isInvalid}
          disabled={disabled || config.disabled}
        />
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
