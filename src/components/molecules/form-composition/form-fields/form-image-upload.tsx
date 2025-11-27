import { useLingui } from '@lingui/react'

import { ImageUpload } from '@/components/atoms/image-upload'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

import type { ImageUploadFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormImageUpload - Wrapper for ImageUpload component
 */
export function FormImageUpload({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: ImageUploadFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  const handleValueChange = (file: File | null) => {
    // Convert File to string URL for form state
    if (file) {
      // Store as File object, preview URL will be handled by ImageUpload component
      field.handleChange(file)
    } else {
      field.handleChange(null)
    }
  }

  // Get value - could be File, string URL, or null
  const value = field.state.value as File | string | null | undefined

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
      <ImageUpload
        id={name}
        name={name}
        value={value}
        onValueChange={handleValueChange}
        accept={config.accept}
        maxSize={config.maxSize}
        aspectRatio={config.aspectRatio}
        disabled={disabled || config.disabled}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
