# ConfirmDialog

A reusable confirmation dialog component that can be used standalone or with a Zustand store for global state management. Supports detecting form changes and automatically showing confirmation dialogs.

## Features

- Standalone usage with props
- Store-based usage for global state
- Keyboard shortcuts (Escape to cancel, Ctrl/Cmd+Enter to confirm)
- Loading states
- Customizable labels and variants
- Integration with FormComposition

## Usage

### Standalone Usage

```tsx
import { ConfirmDialog } from '@/components/molecules/confirm-dialog'
import { useState } from 'react'

function DeleteButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>

      <ConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title={t`Delete item?`}
        description={t`This action cannot be undone.`}
        onConfirm={async () => {
          await deleteItem()
          toast.success('Item deleted')
        }}
        variant="destructive"
      />
    </>
  )
}
```

### With Store

```tsx
import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/molecules/confirm-dialog'

function DeleteButton() {
  const { open } = useConfirmDialog()

  return (
    <Button
      onClick={() =>
        open({
          title: t`Delete item?`,
          description: t`This action cannot be undone.`,
          onConfirm: async () => {
            await deleteItem()
            toast.success('Item deleted')
          },
          variant: 'destructive',
        })
      }
    >
      Delete
    </Button>
  )
}

// Render ConfirmDialog once in your app
function App() {
  return (
    <>
      <DeleteButton />
      <ConfirmDialog useStore={true} />
    </>
  )
}
```

### Wrapped Button Pattern

```tsx
<ConfirmDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title={t`Save changes?`}
  onConfirm={handleSave}
>
  <Button type="submit">Save</Button>
</ConfirmDialog>
```

### Integration with FormComposition

FormComposition has built-in support for ConfirmDialog:

```tsx
<FormComposition
  fields={fields}
  defaultValues={defaultValues}
  onSubmit={handleSubmit}
  showConfirmDialog={true}
  confirmDialogTitle={t`Save changes?`}
  confirmDialogDescription={t`Are you sure you want to save these changes?`}
  confirmDialogConfirmLabel={t`Save`}
  confirmDialogCancelLabel={t`Cancel`}
/>
```

## Props

| Prop           | Type                             | Default         | Description                               |
| -------------- | -------------------------------- | --------------- | ----------------------------------------- |
| `open`         | `boolean`                        | -               | Control visibility (if not using store)   |
| `onOpenChange` | `(open: boolean) => void`        | -               | Change handler (if not using store)       |
| `title`        | `ReactNode \| MessageDescriptor` | -               | Dialog title                              |
| `description`  | `ReactNode \| MessageDescriptor` | -               | Dialog description                        |
| `confirmLabel` | `ReactNode \| MessageDescriptor` | -               | Confirm button label (default: "Confirm") |
| `cancelLabel`  | `ReactNode \| MessageDescriptor` | -               | Cancel button label (default: "Cancel")   |
| `onConfirm`    | `() => void \| Promise<void>`    | required        | Confirm handler                           |
| `onCancel`     | `() => void`                     | -               | Cancel handler                            |
| `variant`      | `'default' \| 'destructive'`     | `'destructive'` | Button variant                            |
| `loading`      | `boolean`                        | `false`         | Loading state                             |
| `useStore`     | `boolean`                        | `false`         | Use store instead of props                |
| `children`     | `ReactNode`                      | -               | Children to wrap (button trigger)         |

## Store API

```tsx
import { useConfirmDialog } from '@/components/molecules/confirm-dialog'

const {
  isOpen, // boolean - Is dialog open
  config, // ConfirmDialogConfig | null - Current config
  open, // (config) => void - Open dialog with config
  close, // () => void - Close dialog
  setLoading, // (loading: boolean) => void - Set loading state
} = useConfirmDialog()
```

### Store Usage Example

```tsx
function MyComponent() {
  const { open, setLoading } = useConfirmDialog()

  const handleDelete = () => {
    open({
      title: t`Delete item?`,
      description: t`This action cannot be undone.`,
      onConfirm: async () => {
        setLoading(true)
        try {
          await deleteItem()
          toast.success('Deleted')
        } finally {
          setLoading(false)
        }
      },
      variant: 'destructive',
    })
  }

  return <Button onClick={handleDelete}>Delete</Button>
}

// In your app root
function App() {
  return (
    <>
      <MyComponent />
      <ConfirmDialog useStore={true} />
    </>
  )
}
```

## Keyboard Shortcuts

- **Escape**: Cancel/close dialog
- **Ctrl/Cmd + Enter**: Confirm action

## Auto-detect Change (Future Feature)

The store can be extended to detect form state changes and automatically show confirmation dialogs:

```tsx
// Future implementation
import { useConfirmDialogOnChange } from '@/components/molecules/confirm-dialog'

function MyForm() {
  const { isDirty } = useFormState()

  useConfirmDialogOnChange(isDirty, {
    title: t`You have unsaved changes`,
    description: t`Are you sure you want to leave?`,
    onConfirm: () => {
      // Navigate away
    },
  })
}
```

## Integration with FormComposition

FormComposition supports ConfirmDialog integration:

```tsx
<FormComposition
  fields={fields}
  defaultValues={defaultValues}
  onSubmit={handleSubmit}
  showConfirmDialog={true}
  confirmDialogTitle={t`Save changes?`}
  confirmDialogDescription={t`Are you sure you want to save?`}
  confirmDialogConfirmLabel={t`Save`}
  confirmDialogCancelLabel={t`Cancel`}
/>
```

When `showConfirmDialog={true}`, the submit button is wrapped with ConfirmDialog, and the dialog appears before calling `onSubmit`.

## Examples

### Delete Confirmation in Table

```tsx
function UserTable() {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  return (
    <>
      <Table>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => setDeleteId(user.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title={t`Delete user?`}
        description={t`This will permanently delete the user. This action cannot be undone.`}
        onConfirm={async () => {
          if (deleteId) {
            await deleteUser(deleteId)
            setDeleteId(null)
            toast.success('User deleted')
          }
        }}
        variant="destructive"
      />
    </>
  )
}
```

### Form Submit Confirmation

```tsx
function UserForm() {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (values: UserFormValues) => {
    await updateUser(values)
    toast.success('User updated')
  }

  return (
    <>
      <FormComposition
        fields={fields}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        showButtons={false}
      />

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title={t`Save changes?`}
        description={t`Are you sure you want to save these changes?`}
        onConfirm={() => {
          // Trigger form submit
          document.getElementById('user-form')?.requestSubmit()
          setShowConfirm(false)
        }}
      >
        <Button type="button" onClick={() => setShowConfirm(true)}>
          Save Changes
        </Button>
      </ConfirmDialog>
    </>
  )
}
```

## Notes

- ConfirmDialog can be used standalone or with store
- Store pattern is useful for global confirmation dialogs
- Keyboard shortcuts improve UX
- Loading states prevent double submissions
- Integration with FormComposition simplifies form confirmations
