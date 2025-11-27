import type { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { useForm, useStore } from '@tanstack/react-form'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import { cn } from '@/packages/utils/styles'

import type {
  FormCompositionProps,
  FormFieldConfig,
} from './form-composition.types'
import {
  FormCalendar,
  FormCheckbox,
  FormCombobox,
  FormImageUpload,
  FormInput,
  FormInputGroup,
  FormMultiSelect,
  FormPassword,
  FormRadioGroup,
  FormSelect,
  FormSlider,
  FormSwitch,
  FormTextarea,
} from './form-fields'

/**
 * FormComposition - Reusable form component using TanStack Form Composition pattern
 *
 * A flexible form component that supports multiple field types with built-in validation,
 * internationalization, and accessibility features.
 *
 * @example
 * ```tsx
 * const fields: FormFieldConfig[] = [
 *   {
 *     type: 'input',
 *     name: 'username',
 *     label: msg`Username`,
 *     inputType: 'text',
 *     required: true,
 *   },
 *   {
 *     type: 'select',
 *     name: 'role',
 *     label: msg`Role`,
 *     options: [
 *       { value: 'admin', label: 'Admin' },
 *       { value: 'user', label: 'User' },
 *     ],
 *   },
 * ]
 *
 * <FormComposition
 *   fields={fields}
 *   defaultValues={{ username: '', role: '' }}
 *   onSubmit={handleSubmit}
 *   onDiscard={handleDiscard}
 *   schema={formSchema}
 *   loading={isLoading}
 * />
 * ```
 *
 * @see {@link https://tanstack.com/form/latest/docs/framework/react/guides/form-composition | TanStack Form Composition}
 */
export function FormComposition<
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
>({
  fields,
  defaultValues,
  onSubmit,
  onDiscard,
  schema,
  loading = false,
  submitLabel,
  discardLabel,
  showButtons = true,
  renderSubmitButton,
  renderDiscardButton,
  onFormStateChange,
  formId = 'form-composition',
  className,
}: FormCompositionProps<TFormValues>) {
  const form = useForm({
    defaultValues,
    validators: schema
      ? {
          onSubmit: schema as any,
        }
      : undefined,
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
  })

  const { i18n } = useLingui()
  const { isDirty, isDefaultValue } = useStore(form.store, (state) => ({
    isDirty: state.isDirty,
    isDefaultValue: state.isDefaultValue,
  }))

  // Store callback in ref to avoid infinite loops
  const onFormStateChangeRef = useRef(onFormStateChange)
  useEffect(() => {
    onFormStateChangeRef.current = onFormStateChange
  }, [onFormStateChange])

  // Expose form state to parent component if callback provided
  useEffect(() => {
    if (onFormStateChangeRef.current) {
      onFormStateChangeRef.current({
        isDirty,
        isDefaultValue,
      })
    }
  }, [isDirty, isDefaultValue])

  const handleDiscard = () => {
    form.reset()
    onDiscard?.()
  }

  const renderField = (fieldConfig: FormFieldConfig) => {
    if (fieldConfig.hidden) {
      return null
    }

    const commonProps = {
      name: fieldConfig.name,
      disabled: loading || fieldConfig.disabled,
    }

    switch (fieldConfig.type) {
      case 'input':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormInput {...commonProps} field={field} config={fieldConfig} />
            )}
          />
        )

      case 'textarea':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormTextarea
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'select':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormSelect {...commonProps} field={field} config={fieldConfig} />
            )}
          />
        )

      case 'combobox':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormCombobox
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'checkbox':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormCheckbox
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'radio':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormRadioGroup
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'switch':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormSwitch {...commonProps} field={field} config={fieldConfig} />
            )}
          />
        )

      case 'slider':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormSlider {...commonProps} field={field} config={fieldConfig} />
            )}
          />
        )

      case 'calendar':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormCalendar
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'input-group':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormInputGroup
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'password':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormPassword
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'multi-select':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormMultiSelect
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      case 'image-upload':
        return (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            children={(field) => (
              <FormImageUpload
                {...commonProps}
                field={field}
                config={fieldConfig}
              />
            )}
          />
        )

      default:
        return null
    }
  }

  const buttonProps = {
    disabled: loading || !isDirty || isDefaultValue,
    loading,
    isDirty,
    isDefaultValue,
  }

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn(
        '@container/form flex flex-col gap-4 @xl/main:gap-6',
        className,
      )}
    >
      <FieldGroup className="gap-4 @xl/form:gap-6">
        {fields.map(renderField)}
      </FieldGroup>

      {showButtons && (
        <Field>
          <div className="flex items-center gap-2">
            {renderSubmitButton ? (
              renderSubmitButton(buttonProps)
            ) : (
              <Button type="submit" disabled={buttonProps.disabled}>
                {submitLabel ? (
                  typeof submitLabel === 'string' ? (
                    submitLabel
                  ) : typeof submitLabel === 'object' &&
                    submitLabel !== null &&
                    'id' in submitLabel ? (
                    i18n._(submitLabel)
                  ) : (
                    submitLabel
                  )
                ) : (
                  <Trans>Save Changes</Trans>
                )}
              </Button>
            )}
            {renderDiscardButton ? (
              renderDiscardButton({ ...buttonProps, onDiscard: handleDiscard })
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={handleDiscard}
                disabled={buttonProps.disabled}
              >
                {discardLabel ? (
                  typeof discardLabel === 'string' ? (
                    discardLabel
                  ) : typeof discardLabel === 'object' &&
                    discardLabel !== null &&
                    'id' in discardLabel ? (
                    i18n._(discardLabel)
                  ) : (
                    discardLabel
                  )
                ) : (
                  <Trans>Discard</Trans>
                )}
              </Button>
            )}
          </div>
        </Field>
      )}
    </form>
  )
}
