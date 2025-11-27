# FormComposition

A reusable form component built with TanStack Form Composition pattern. Supports various input types with built-in validation, internationalization, and accessibility features.

## Features

- **12 Field Types**: input, textarea, select, combobox, checkbox, radio, switch, slider, calendar, input-group, password, multi-select
- **Type-safe**: Full TypeScript support with Zod schema validation
- **Internationalization**: Built-in support for Lingui (i18n) with MessageDescriptor
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Validation**: Zod schema integration with TanStack Form
- **Composition Pattern**: Clean, maintainable code structure

## Installation

The component is already available in the project. Import it from:

```tsx
import { FormComposition } from '@/components/molecules/form-composition'
import type {
  FormFieldConfig,
  FormCompositionProps,
} from '@/components/molecules/form-composition'
```

## Basic Usage

```tsx
import { FormComposition } from '@/components/molecules/form-composition'
import type { FormFieldConfig } from '@/components/molecules/form-composition'
import { z } from 'zod'
import { msg } from '@lingui/react/macro'

// Define form schema
const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
})

type UserForm = z.infer<typeof userSchema>

// Define field configurations
const fields: FormFieldConfig[] = [
  {
    type: 'input',
    name: 'username',
    label: msg`Username`,
    inputType: 'text',
    placeholder: msg`Enter username`,
    required: true,
  },
  {
    type: 'input',
    name: 'email',
    label: msg`Email`,
    inputType: 'email',
    placeholder: msg`Enter email`,
    required: true,
  },
  {
    type: 'select',
    name: 'role',
    label: msg`Role`,
    options: [
      { value: 'admin', label: msg`Admin` },
      { value: 'user', label: msg`User` },
    ],
    required: true,
  },
]

// Use the component
function UserForm() {
  const handleSubmit = async (values: UserForm) => {
    console.log('Form values:', values)
    // Submit to API
  }

  const handleDiscard = () => {
    console.log('Form discarded')
  }

  return (
    <FormComposition
      fields={fields}
      defaultValues={{ username: '', email: '', role: 'user' }}
      onSubmit={handleSubmit}
      onDiscard={handleDiscard}
      schema={userSchema}
    />
  )
}
```

## Field Types

### Input

Basic text input with various input types.

```tsx
{
  type: 'input',
  name: 'username',
  label: msg`Username`,
  inputType: 'text' | 'email' | 'url' | 'password' | 'number' | 'tel' | 'search',
  placeholder: msg`Enter username`,
  autoComplete: 'username',
  required: true,
}
```

### Textarea

Multi-line text input.

```tsx
{
  type: 'textarea',
  name: 'bio',
  label: msg`Biography`,
  placeholder: msg`Enter your bio`,
  rows: 4,
  maxLength: 500,
}
```

### Select

Dropdown select with options.

```tsx
{
  type: 'select',
  name: 'country',
  label: msg`Country`,
  options: [
    { value: 'us', label: msg`United States` },
    { value: 'vn', label: msg`Vietnam` },
  ],
  placeholder: msg`Select country`,
}
```

### Combobox

Searchable select with single or multiple selection.

```tsx
{
  type: 'combobox',
  name: 'tags',
  label: msg`Tags`,
  options: [
    { value: 'react', label: msg`React` },
    { value: 'typescript', label: msg`TypeScript` },
  ],
  multiple: true,
  clearable: true,
  selectPlaceholder: msg`Select tags`,
  searchPlaceholder: msg`Search tags...`,
  emptyText: msg`No tags found`,
}
```

### Checkbox

Single checkbox input.

```tsx
{
  type: 'checkbox',
  name: 'agree',
  label: msg`I agree to the terms`,
  checkboxLabel: msg`Accept terms and conditions`,
  required: true,
}
```

### Radio Group

Radio button group with options.

```tsx
{
  type: 'radio',
  name: 'gender',
  label: msg`Gender`,
  options: [
    { value: 'male', label: msg`Male` },
    { value: 'female', label: msg`Female` },
    { value: 'other', label: msg`Other` },
  ],
  orientation: 'horizontal', // or 'vertical'
}
```

### Switch

Toggle switch input.

```tsx
{
  type: 'switch',
  name: 'notifications',
  label: msg`Enable notifications`,
  switchLabel: msg`Receive email notifications`,
}
```

### Slider

Range slider input.

```tsx
{
  type: 'slider',
  name: 'age',
  label: msg`Age`,
  min: 0,
  max: 100,
  step: 1,
  showValue: true,
}
```

### Calendar

Date picker with single or range selection.

```tsx
{
  type: 'calendar',
  name: 'birthday',
  label: msg`Birthday`,
  mode: 'single', // or 'range'
  placeholder: msg`Pick a date`,
}

// Range mode
{
  type: 'calendar',
  name: 'dateRange',
  label: msg`Date Range`,
  mode: 'range',
  placeholder: msg`Pick a date range`,
}
```

### Input Group

Input with prefix/suffix addons.

```tsx
{
  type: 'input-group',
  name: 'website',
  label: msg`Website`,
  inputType: 'url',
  placeholder: msg`Enter website URL`,
  addons: [
    {
      type: 'text',
      content: 'https://',
      align: 'inline-start',
    },
    {
      type: 'button',
      content: {
        label: <SearchIcon />,
        onClick: () => console.log('Search'),
      },
      align: 'inline-end',
    },
  ],
}
```

### Password

Password input with visibility toggle.

```tsx
{
  type: 'password',
  name: 'password',
  label: msg`Password`,
  placeholder: msg`Enter password`,
  autoComplete: 'new-password',
  required: true,
}
```

### Multi-Select

Multi-select component with badges and search.

```tsx
{
  type: 'multi-select',
  name: 'skills',
  label: msg`Skills`,
  options: [
    { value: 'react', label: msg`React` },
    { value: 'vue', label: msg`Vue` },
    { value: 'angular', label: msg`Angular` },
  ],
  placeholder: msg`Select skills`,
  variant: 'default',
  maxCount: 3,
  searchable: true,
}
```

## Props

### FormCompositionProps

```tsx
interface FormCompositionProps<TFormValues> {
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

  /** Form ID attribute */
  formId?: string

  /** Additional CSS classes */
  className?: string
}
```

## Validation

### With Zod Schema

```tsx
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  age: z.number().min(18).max(100),
})

<FormComposition
  fields={fields}
  defaultValues={{ username: '', email: '', age: 18 }}
  onSubmit={handleSubmit}
  schema={formSchema} // ← Validation schema
/>
```

Validation errors are automatically displayed below each field when validation fails.

## Internationalization

All labels, descriptions, and placeholders support Lingui's `MessageDescriptor`:

```tsx
import { msg } from '@lingui/react/macro'

const fields: FormFieldConfig[] = [
  {
    type: 'input',
    name: 'username',
    label: msg`Username`, // ← MessageDescriptor
    placeholder: msg`Enter username`,
  },
]
```

You can also use plain strings:

```tsx
{
  type: 'input',
  name: 'username',
  label: 'Username', // ← Plain string
  placeholder: 'Enter username',
}
```

## Advanced Examples

### Conditional Fields

```tsx
const fields: FormFieldConfig[] = [
  {
    type: 'switch',
    name: 'hasAddress',
    label: msg`Has Address`,
  },
  {
    type: 'input',
    name: 'address',
    label: msg`Address`,
    hidden: !formValues.hasAddress, // ← Hide based on condition
  },
]
```

### Custom Validation

```tsx
{
  type: 'input',
  name: 'password',
  label: msg`Password`,
  validator: (value) => {
    if (typeof value === 'string' && value.length < 8) {
      return 'Password must be at least 8 characters'
    }
    return undefined
  },
}
```

### Loading State

```tsx
const [isLoading, setIsLoading] = useState(false)

<FormComposition
  fields={fields}
  defaultValues={defaultValues}
  onSubmit={async (values) => {
    setIsLoading(true)
    try {
      await submitForm(values)
    } finally {
      setIsLoading(false)
    }
  }}
  loading={isLoading} // ← Disables form during submission
/>
```

## TypeScript

The component is fully typed with TypeScript. Form values are inferred from `defaultValues`:

```tsx
const defaultValues = {
  username: '',
  email: '',
  age: 18,
}

// TFormValues is inferred as { username: string; email: string; age: number }
<FormComposition<typeof defaultValues>
  fields={fields}
  defaultValues={defaultValues}
  onSubmit={(values) => {
    // values is typed as { username: string; email: string; age: number }
  }}
/>
```

## Field Components

Individual field components can be used standalone if needed:

```tsx
import { FormInput, FormSelect } from '@/components/molecules/form-composition'

// Use with TanStack Form directly
;<form.Field name="username">
  {(field) => (
    <FormInput
      name="username"
      field={field}
      config={{
        type: 'input',
        name: 'username',
        label: 'Username',
      }}
    />
  )}
</form.Field>
```

## See Also

- [TanStack Form Documentation](https://tanstack.com/form/latest)
- [Zod Documentation](https://zod.dev/)
- [Lingui Documentation](https://lingui.dev/)
