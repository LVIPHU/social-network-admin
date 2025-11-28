# ModalComposition

A flexible modal component that automatically renders Dialog or Sheet based on the modal store mode. Supports create, update, duplicate, and delete actions with event handlers.

## Features

- Automatic Dialog/Sheet rendering based on store mode
- Support for create, update, duplicate, and delete actions
- Delete action automatically renders AlertDialog
- Event handlers: beforeOpen, afterClose, beforeSubmit, afterSubmit
- ScrollArea for long content
- Icons for each action type
- Integration with FormComposition

## Usage

### Basic Usage

```tsx
import { ModalComposition } from '@/components/molecules/modal-composition'
import { useModal } from '@/stores/modal'

function UserModal() {
  const { open } = useModal('user')

  return (
    <>
      <Button onClick={() => open('create')}>Create User</Button>

      <ModalComposition
        name="user"
        onSubmit={async (action, payload) => {
          if (action === 'create') {
            await createUser(payload?.item)
          } else if (action === 'update') {
            await updateUser(payload?.item)
          }
        }}
      >
        <FormComposition
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </ModalComposition>
    </>
  )
}
```

### With Event Handlers

```tsx
<ModalComposition
  name="user"
  beforeOpen={async (action, payload) => {
    // Fetch data before opening
    if (action === 'update') {
      await fetchUserData(payload?.item?.id)
    }
  }}
  afterClose={(action, payload) => {
    // Cleanup after closing
    console.log('Modal closed', action)
  }}
  beforeSubmit={async (action, payload) => {
    // Validate before submit
    if (action === 'delete') {
      const confirmed = await confirmDelete()
      if (!confirmed) throw new Error('Cancelled')
    }
  }}
  afterSubmit={(action, payload) => {
    // Show notification after submit
    toast.success(`User ${action}d successfully`)
  }}
  onSubmit={handleSubmit}
>
  <FormComposition ... />
</ModalComposition>
```

### Custom Titles and Labels

```tsx
<ModalComposition
  name="user"
  title={t`Edit User`}
  description={t`Update user information`}
  confirmLabel={t`Save`}
  cancelLabel={t`Cancel`}
  onSubmit={handleSubmit}
>
  <FormComposition ... />
</ModalComposition>
```

## Props

| Prop           | Type                                         | Default        | Description                                   |
| -------------- | -------------------------------------------- | -------------- | --------------------------------------------- |
| `name`         | `ModalName`                                  | required       | Modal name to match with store                |
| `children`     | `ReactNode`                                  | required       | Modal content (usually FormComposition)       |
| `onSubmit`     | `(action, payload) => void \| Promise<void>` | -              | Submit handler                                |
| `title`        | `ReactNode \| MessageDescriptor`             | -              | Custom title (auto-generated if not provided) |
| `description`  | `ReactNode \| MessageDescriptor`             | -              | Custom description                            |
| `confirmLabel` | `ReactNode \| MessageDescriptor`             | -              | Confirm button label                          |
| `cancelLabel`  | `ReactNode \| MessageDescriptor`             | -              | Cancel button label                           |
| `formId`       | `string`                                     | `'modal-form'` | Form ID to link with FormComposition          |
| `className`    | `string`                                     | -              | Additional CSS classes                        |
| `beforeOpen`   | `(action, payload) => void \| Promise<void>` | -              | Callback before modal opens                   |
| `afterClose`   | `(action, payload) => void \| Promise<void>` | -              | Callback after modal closes                   |
| `beforeSubmit` | `(action, payload) => void \| Promise<void>` | -              | Callback before submit                        |
| `afterSubmit`  | `(action, payload) => void \| Promise<void>` | -              | Callback after submit                         |

## Actions

### Create

- Icon: Plus icon
- Title: "Create a new item" (default)
- Renders: Dialog or Sheet based on mode

### Update

- Icon: Pencil icon
- Title: "Update an existing item" (default)
- Renders: Dialog or Sheet based on mode

### Duplicate

- Icon: Copy icon
- Title: "Duplicate an existing item" (default)
- Renders: Dialog or Sheet based on mode

### Delete

- Icon: None (AlertDialog)
- Title: "Are you sure you want to delete this item?" (default)
- Description: "This action cannot be undone." (default)
- Renders: AlertDialog (always, regardless of mode)

## Store Integration

ModalComposition uses the modal store from `@/stores/modal`:

```tsx
import { useModal, useModalStore } from '@/stores/modal'

// Get modal state
const { isOpen, action, payload, open, close } = useModal('user')

// Change mode (DIALOG or SHEET)
const setMode = useModalStore((state) => state.setMode)
setMode('SHEET')
```

## Dialog vs Sheet

- **Dialog**: Centered modal, good for forms and confirmations
- **Sheet**: Side panel, good for mobile and secondary actions

The mode is controlled by `useModalStore`:

```tsx
import { useModalStore } from '@/stores/modal'

const setMode = useModalStore((state) => state.setMode)

// Switch to Sheet mode
setMode('SHEET')

// Switch to Dialog mode
setMode('DIALOG')
```

## ScrollArea

ModalComposition automatically wraps content in ScrollArea for long content:

- Max height: `60vh` on mobile, `fit-content` on desktop
- Smooth scrolling
- Custom scrollbar styling

## Integration with FormComposition

ModalComposition works seamlessly with FormComposition:

```tsx
<ModalComposition name="user" onSubmit={handleSubmit} formId="user-form">
  <FormComposition
    formId="user-form"
    fields={fields}
    defaultValues={defaultValues}
    onSubmit={handleFormSubmit}
    showButtons={false} // Hide buttons, ModalComposition provides them
  />
</ModalComposition>
```

## Examples

### Create User Modal

```tsx
const { open } = useModal('user')

<Button onClick={() => open('create')}>Create User</Button>

<ModalComposition
  name="user"
  onSubmit={async (action, payload) => {
    if (action === 'create') {
      const newUser = await createUser(payload?.item)
      toast.success('User created')
    }
  }}
>
  <FormComposition
    fields={userFields}
    defaultValues={{ name: '', email: '' }}
    onSubmit={(values) => {
      // This is called by ModalComposition's onSubmit
    }}
  />
</ModalComposition>
```

### Update User Modal

```tsx
const { open } = useModal('user')

<Button onClick={() => open('update', { item: user })}>Edit</Button>

<ModalComposition
  name="user"
  beforeOpen={async (action, payload) => {
    if (action === 'update') {
      // Fetch latest user data
      await refetchUser(payload?.item?.id)
    }
  }}
  onSubmit={async (action, payload) => {
    if (action === 'update') {
      await updateUser(payload?.item)
    }
  }}
>
  <FormComposition
    fields={userFields}
    defaultValues={user}
    onSubmit={(values) => {
      // Update logic
    }}
  />
</ModalComposition>
```

### Delete Confirmation

```tsx
const { open } = useModal('user')

<Button onClick={() => open('delete', { item: user })}>Delete</Button>

<ModalComposition
  name="user"
  onSubmit={async (action, payload) => {
    if (action === 'delete') {
      await deleteUser(payload?.item?.id)
      toast.success('User deleted')
    }
  }}
>
  {/* Content not needed for delete, AlertDialog is rendered automatically */}
</ModalComposition>
```

## Notes

- ModalComposition automatically detects action from store and renders appropriate UI
- Delete action always renders AlertDialog, regardless of mode
- Event handlers are optional but useful for data fetching and validation
- ScrollArea is automatically applied for better UX with long content
- Icons are automatically displayed for create, update, and duplicate actions
