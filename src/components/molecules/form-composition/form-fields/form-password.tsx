import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import type { PasswordFieldConfig } from '../form-composition.types'

import { renderTranslatableContent } from './form-fields.helper'
import type { BaseFieldProps } from './form-fields.types'

/**
 * FormPassword - Wrapper for Password input with visibility toggle
 */
export function FormPassword({
  name,
  field,
  config,
  disabled,
}: BaseFieldProps & {
  config: PasswordFieldConfig
}) {
  const { i18n } = useLingui()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
        <InputGroupInput
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
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
          autoComplete={config.autoComplete || 'off'}
          aria-invalid={isInvalid}
          disabled={disabled || config.disabled}
        />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                size="icon-xs"
                onClick={togglePasswordVisibility}
                type="button"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {showPassword ? (
                  <Trans>Hide password</Trans>
                ) : (
                  <Trans>Show password</Trans>
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
