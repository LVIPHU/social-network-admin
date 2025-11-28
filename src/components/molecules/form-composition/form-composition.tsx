import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { useForm, useStore } from '@tanstack/react-form'
import { useEffect, useRef, useState } from 'react'

import { ConfirmDialog } from '@/components/molecules/confirm-dialog'
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
import { FormFieldSkeleton } from './form-fields/form-field-skeleton'

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
  layout = 'default',
  gridCols = 1,
  gridRows = 'auto',
  gap = 4,
  fieldGroupClassName,
  fieldClassName,
  showSkeleton,
  skeletonClassName,
  showConfirmDialog = false,
  confirmDialogTitle,
  confirmDialogDescription,
  confirmDialogConfirmLabel,
  confirmDialogCancelLabel,
  beforeSubmit,
  afterSubmit,
  // onFieldChange, // TODO: Implement field change tracking
  // onFieldBlur, // TODO: Implement field blur tracking
}: Omit<FormCompositionProps<TFormValues>, 'onFieldChange' | 'onFieldBlur'>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form = useForm({
    defaultValues,
    validators: schema
      ? {
          onSubmit: schema as any,
        }
      : undefined,
    onSubmit: async ({ value }) => {
      // Call beforeSubmit
      if (beforeSubmit) {
        const result = await beforeSubmit(value)
        if (result === false) {
          return // Cancel submit
        }
      }

      try {
        setIsSubmitting(true)
        const result = await onSubmit(value)

        // Call afterSubmit
        if (afterSubmit) {
          await afterSubmit(value, result)
        }
      } catch (error) {
        console.error('Form submit error:', error)
        throw error
      } finally {
        setIsSubmitting(false)
      }
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

  // Track field changes and blur events
  // Note: This is a simplified implementation. For full field tracking,
  // you would need to subscribe to individual field changes in each field component.

  const shouldShowSkeleton = showSkeleton ?? loading

  const renderField = (fieldConfig: FormFieldConfig) => {
    if (fieldConfig.hidden) {
      return null
    }

    // Show skeleton if loading
    if (shouldShowSkeleton) {
      return (
        <FormFieldSkeleton
          key={fieldConfig.name}
          type={fieldConfig.type}
          colSpan={fieldConfig.colSpan}
          rowSpan={fieldConfig.rowSpan}
          className={cn(
            fieldClassName,
            fieldConfig.className,
            skeletonClassName,
          )}
        />
      )
    }

    const commonProps = {
      name: fieldConfig.name,
      disabled: loading || isSubmitting || fieldConfig.disabled,
    }

    const fieldWrapperClass = cn(fieldClassName, fieldConfig.className)

    const fieldWrapperStyle =
      layout === 'grid'
        ? {
            gridColumn: fieldConfig.colSpan
              ? `span ${fieldConfig.colSpan} / span ${fieldConfig.colSpan}`
              : undefined,
            gridRow: fieldConfig.rowSpan
              ? `span ${fieldConfig.rowSpan} / span ${fieldConfig.rowSpan}`
              : undefined,
          }
        : undefined

    const renderFieldElement = () => {
      switch (fieldConfig.type) {
        case 'input':
          return (
            <form.Field
              key={fieldConfig.name}
              name={fieldConfig.name}
              children={(field) => (
                <FormInput
                  {...commonProps}
                  field={field}
                  config={fieldConfig}
                />
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
                <FormSelect
                  {...commonProps}
                  field={field}
                  config={fieldConfig}
                />
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
                <FormSwitch
                  {...commonProps}
                  field={field}
                  config={fieldConfig}
                />
              )}
            />
          )

        case 'slider':
          return (
            <form.Field
              key={fieldConfig.name}
              name={fieldConfig.name}
              children={(field) => (
                <FormSlider
                  {...commonProps}
                  field={field}
                  config={fieldConfig}
                />
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

    const fieldElement = renderFieldElement()

    // Wrap field with div if grid layout or has custom className
    if (layout === 'grid' || fieldWrapperClass) {
      return (
        <div
          key={fieldConfig.name}
          className={fieldWrapperClass}
          style={fieldWrapperStyle}
        >
          {fieldElement}
        </div>
      )
    }

    return fieldElement
  }

  const buttonProps = {
    disabled: loading || isSubmitting || !isDirty || isDefaultValue,
    loading: loading || isSubmitting,
    isDirty,
    isDefaultValue,
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (showConfirmDialog) {
      setShowConfirm(true)
    } else {
      await form.handleSubmit()
    }
  }

  const handleConfirmSubmit = () => {
    setShowConfirm(false)
    // Small delay to ensure dialog closes before form submits
    setTimeout(async () => {
      await form.handleSubmit()
    }, 100)
  }

  return (
    <form
      id={formId}
      onSubmit={handleFormSubmit}
      className={cn(
        '@container/form flex flex-col gap-4 @xl/main:gap-6',
        className,
      )}
    >
      <FieldGroup
        className={cn(
          layout === 'grid' && 'grid',
          layout === 'default' && 'gap-4 @xl/form:gap-6',
          fieldGroupClassName,
        )}
        style={
          layout === 'grid'
            ? {
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                gridTemplateRows:
                  gridRows !== 'auto' ? `repeat(${gridRows}, 1fr)` : 'auto',
                gap: `${gap * 0.25}rem`, // Convert gap number to rem (gap-4 = 1rem)
              }
            : undefined
        }
      >
        {fields.map(renderField)}
      </FieldGroup>

      {showButtons && (
        <Field>
          <div className="flex items-center gap-2">
            {showConfirmDialog ? (
              <>
                <ConfirmDialog
                  open={showConfirm}
                  onOpenChange={setShowConfirm}
                  title={confirmDialogTitle}
                  description={confirmDialogDescription}
                  confirmLabel={confirmDialogConfirmLabel}
                  cancelLabel={confirmDialogCancelLabel}
                  onConfirm={handleConfirmSubmit}
                  loading={buttonProps.loading}
                />
                {renderSubmitButton ? (
                  <div onClick={() => setShowConfirm(true)}>
                    {renderSubmitButton(buttonProps)}
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    disabled={buttonProps.disabled}
                  >
                    {submitLabel ? (
                      typeof submitLabel === 'string' ? (
                        submitLabel
                      ) : typeof submitLabel === 'object' &&
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
              </>
            ) : renderSubmitButton ? (
              renderSubmitButton(buttonProps)
            ) : (
              <Button type="submit" disabled={buttonProps.disabled}>
                {submitLabel ? (
                  typeof submitLabel === 'string' ? (
                    submitLabel
                  ) : typeof submitLabel === 'object' && 'id' in submitLabel ? (
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
