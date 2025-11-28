import type { MessageDescriptor } from '@lingui/core'
import type { ReactNode } from 'react'
import type { z } from 'zod'

import type { MultiSelectProps } from '@/components/atoms/multi-select'

/**
 * Union type of all supported field types
 */
export type FormFieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'combobox'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'slider'
  | 'calendar'
  | 'input-group'
  | 'password'
  | 'multi-select'
  | 'image-upload'

/**
 * Base configuration for all fields
 */
export interface BaseFieldConfig {
  /** Field name (key in form values) */
  name: string
  /** Label displayed for the field */
  label?: ReactNode | MessageDescriptor
  /** Description/helper text for the field */
  description?: ReactNode | MessageDescriptor
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** Whether the field is hidden */
  hidden?: boolean
  /** Custom validation function (optional, usually use schema instead) */
  validator?: (value: unknown) => string | undefined
  /** Number of columns field spans in grid layout (default: 1) */
  colSpan?: number
  /** Number of rows field spans in grid layout (default: 1) */
  rowSpan?: number
  /** Custom className for field wrapper */
  className?: string
}

/**
 * Configuration for Input field
 */
export interface InputFieldConfig extends BaseFieldConfig {
  type: 'input'
  /** Input type: text, email, url, password, number, tel, etc. */
  inputType?:
    | 'text'
    | 'email'
    | 'url'
    | 'password'
    | 'number'
    | 'tel'
    | 'search'
  /** Placeholder text */
  placeholder?: string | MessageDescriptor
  /** AutoComplete attribute */
  autoComplete?: string
  /** Min value (for number input) */
  min?: number
  /** Max value (for number input) */
  max?: number
  /** Step value (for number input) */
  step?: number
}

/**
 * Configuration for Textarea field
 */
export interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea'
  /** Default number of rows */
  rows?: number
  /** Placeholder text */
  placeholder?: string | MessageDescriptor
  /** Maximum length */
  maxLength?: number
}

/**
 * Option for Select/Combobox/Radio fields
 */
export interface SelectOption {
  value: string
  label: ReactNode | MessageDescriptor
  disabled?: boolean
}

/**
 * Configuration for Select field
 */
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select'
  /** Options for select */
  options: Array<SelectOption>
  /** Placeholder text */
  placeholder?: string | MessageDescriptor
}

/**
 * Configuration for Combobox field
 */
export interface ComboboxFieldConfig extends BaseFieldConfig {
  type: 'combobox'
  /** Options for combobox */
  options: Array<SelectOption>
  /** Allow multiple selection */
  multiple?: boolean
  /** Allow clearing selection */
  clearable?: boolean
  /** Placeholder text */
  selectPlaceholder?: string | MessageDescriptor
  /** Search placeholder */
  searchPlaceholder?: string | MessageDescriptor
  /** Empty text when no results found */
  emptyText?: string | MessageDescriptor
}

/**
 * Configuration for Checkbox field
 */
export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox'
  /** Checkbox label (if different from field label) */
  checkboxLabel?: ReactNode | MessageDescriptor
  /** Orientation: vertical or horizontal (default: 'vertical') */
  orientation?: 'vertical' | 'horizontal'
}

/**
 * Configuration for RadioGroup field
 */
export interface RadioGroupFieldConfig extends BaseFieldConfig {
  type: 'radio'
  /** Options for radio group */
  options: Array<SelectOption>
  /** Orientation: vertical or horizontal */
  orientation?: 'vertical' | 'horizontal'
}

/**
 * Configuration for Switch field
 */
export interface SwitchFieldConfig extends BaseFieldConfig {
  type: 'switch'
  /** Switch label (if different from field label) */
  switchLabel?: ReactNode | MessageDescriptor
}

/**
 * Configuration for Slider field
 */
export interface SliderFieldConfig extends BaseFieldConfig {
  type: 'slider'
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step value */
  step?: number
  /** Display current value */
  showValue?: boolean
}

/**
 * Configuration for Calendar field
 */
export interface CalendarFieldConfig extends BaseFieldConfig {
  type: 'calendar'
  /** Calendar mode: single date or range */
  mode?: 'single' | 'range'
  /** Placeholder text */
  placeholder?: string | MessageDescriptor
}

/**
 * InputGroup addon configuration
 */
export interface InputGroupAddon {
  /** Addon type: text or button */
  type: 'text' | 'button'
  /** Addon content (text or button props) */
  content:
    | ReactNode
    | { label: ReactNode; onClick?: () => void; icon?: ReactNode }
  /** Addon alignment */
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end'
}

/**
 * Configuration for InputGroup field
 */
export interface InputGroupFieldConfig extends BaseFieldConfig {
  type: 'input-group'
  /** Input type */
  inputType?:
    | 'text'
    | 'email'
    | 'url'
    | 'password'
    | 'number'
    | 'tel'
    | 'search'
  /** Placeholder text */
  placeholder?: string | MessageDescriptor
  /** AutoComplete attribute */
  autoComplete?: string
  /** Addons (prefix/suffix) */
  addons?: Array<InputGroupAddon>
}

/**
 * Configuration for Password field (with visibility toggle)
 */
export interface PasswordFieldConfig extends BaseFieldConfig {
  type: 'password'
  /** Placeholder text */
  placeholder?: string | MessageDescriptor
  /** AutoComplete attribute */
  autoComplete?: string
}

/**
 * Configuration for MultiSelect field
 */
export interface MultiSelectFieldConfig extends BaseFieldConfig {
  type: 'multi-select'
  /** Options for multi-select */
  options: Array<SelectOption>
  /** Placeholder text */
  placeholder?: string | MessageDescriptor
  /** Variant style */
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted'
  /** Maximum number of items to display before summarizing */
  maxCount?: number
  /** Enable search functionality */
  searchable?: boolean
  /** Custom empty indicator */
  emptyIndicator?: ReactNode
  /** Additional props for MultiSelect component */
  multiSelectProps?: Omit<
    MultiSelectProps,
    | 'options'
    | 'onValueChange'
    | 'defaultValue'
    | 'placeholder'
    | 'disabled'
    | 'variant'
    | 'maxCount'
    | 'searchable'
    | 'emptyIndicator'
  >
}

/**
 * Configuration for ImageUpload field
 */
export interface ImageUploadFieldConfig extends BaseFieldConfig {
  type: 'image-upload'
  /** Accept file types (default: image/*) */
  accept?: string | Record<string, Array<string>>
  /** Maximum file size in bytes */
  maxSize?: number
  /** Aspect ratio (default: 'square') */
  aspectRatio?: 'square' | 'video' | 'auto'
}

/**
 * Union type of all field configurations
 */
export type FormFieldConfig =
  | InputFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | ComboboxFieldConfig
  | CheckboxFieldConfig
  | RadioGroupFieldConfig
  | SwitchFieldConfig
  | SliderFieldConfig
  | CalendarFieldConfig
  | InputGroupFieldConfig
  | PasswordFieldConfig
  | MultiSelectFieldConfig
  | ImageUploadFieldConfig

/**
 * Props for FormComposition component
 */
export interface FormCompositionProps<
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Array of field configurations */
  fields: Array<FormFieldConfig>
  /** Default values for the form */
  defaultValues: TFormValues
  /** Submit handler - receives form values */
  onSubmit: (values: TFormValues) => void | Promise<void>
  /** Discard handler (optional, defaults to form reset) */
  onDiscard?: () => void
  /** Zod schema for validation (optional) */
  schema?: z.ZodType<TFormValues>
  /** Loading state - disables form during submission */
  loading?: boolean
  /** Custom submit button label */
  submitLabel?: ReactNode | MessageDescriptor
  /** Custom discard button label */
  discardLabel?: ReactNode | MessageDescriptor
  /** Show default submit and discard buttons (default: true) */
  showButtons?: boolean
  /** Custom render function for submit button (overrides default button) */
  renderSubmitButton?: (props: {
    disabled: boolean
    loading: boolean
    isDirty: boolean
    isDefaultValue: boolean
  }) => ReactNode
  /** Custom render function for discard button (overrides default button) */
  renderDiscardButton?: (props: {
    disabled: boolean
    loading: boolean
    isDirty: boolean
    isDefaultValue: boolean
    onDiscard: () => void
  }) => ReactNode
  /** Callback to expose form state (isDirty, isDefaultValue) for custom buttons */
  onFormStateChange?: (state: {
    isDirty: boolean
    isDefaultValue: boolean
  }) => void
  /** Form ID attribute */
  formId?: string
  /** Additional CSS classes */
  className?: string
  /** Layout mode (default: 'default' = single column) */
  layout?: 'default' | 'grid'
  /** Number of columns in grid layout (default: 1) */
  gridCols?: number
  /** Number of rows in grid layout (default: 'auto' = auto-calculate) */
  gridRows?: number | 'auto'
  /** Gap between fields (default: 4, creates class gap-{gap}) */
  gap?: number
  /** Custom className for FieldGroup (to customize gap, layout, etc.) */
  fieldGroupClassName?: string
  /** Default className for all fields */
  fieldClassName?: string
  /** Show skeleton when loading (default: auto-detect from loading prop) */
  showSkeleton?: boolean
  /** Custom className for skeleton */
  skeletonClassName?: string
  /** Show confirm dialog before submit (default: false) */
  showConfirmDialog?: boolean
  /** Confirm dialog title */
  confirmDialogTitle?: ReactNode | MessageDescriptor
  /** Confirm dialog description */
  confirmDialogDescription?: ReactNode | MessageDescriptor
  /** Confirm dialog confirm label */
  confirmDialogConfirmLabel?: ReactNode | MessageDescriptor
  /** Confirm dialog cancel label */
  confirmDialogCancelLabel?: ReactNode | MessageDescriptor
  /** Callback before submit */
  beforeSubmit?: (values: TFormValues) => void | Promise<void> | boolean
  /** Callback after submit */
  afterSubmit?: (values: TFormValues, result?: unknown) => void | Promise<void>
  /** Callback when any field changes */
  onFieldChange?: (name: string, value: unknown) => void
  /** Callback when any field blurs */
  onFieldBlur?: (name: string) => void
}
