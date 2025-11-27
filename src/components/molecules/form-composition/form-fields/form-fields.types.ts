import type { FieldApi } from '@tanstack/react-form'

/**
 * Type alias for FieldApi with 23 type parameters
 *
 * FieldApi from TanStack Form requires 23 type parameters to ensure type safety.
 * In this case, we use `any` for all parameters to simplify the type definition
 * since field components don't need strict typing for these generic parameters.
 *
 * @internal - This type is only used internally within form-fields
 */
type AnyFieldApi = FieldApi<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>

/**
 * Field state type from TanStack Form
 *
 * Represents the state of a field in the form, including value, meta, and handlers.
 * Used to type the field prop in field components.
 */
export type FieldState = AnyFieldApi

/**
 * Base props for all field components
 *
 * Basic props that every field component needs:
 * - name: Field name (key in form values)
 * - field: FieldApi instance from TanStack Form
 * - disabled: Disabled state of the field
 */
export type BaseFieldProps = {
  /** Field name (key in form values) */
  name: string
  /** FieldApi instance from TanStack Form containing state and handlers */
  field: AnyFieldApi
  /** Whether the field is disabled */
  disabled?: boolean
}
