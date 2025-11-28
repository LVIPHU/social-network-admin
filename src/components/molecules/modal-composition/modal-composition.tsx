import { t } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { Copy, Pencil, Plus } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { renderTranslatableContent } from '@/components/molecules/form-composition/form-fields/form-fields.helper'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useModal, useModalStore  } from '@/stores/modal'

import type { ModalCompositionProps } from './modal-composition.types'

/**
 * ModalComposition - Component for managing modals with Dialog/Sheet based on store mode
 *
 * Automatically renders Dialog or Sheet based on modal store mode.
 * Handles create, update, duplicate, and delete actions.
 *
 * @example
 * ```tsx
 * <ModalComposition
 *   name="user"
 *   onSubmit={handleSubmit}
 *   beforeOpen={async (action) => {
 *     if (action === 'update') {
 *       await fetchUserData()
 *     }
 *   }}
 * >
 *   <FormComposition fields={fields} defaultValues={defaultValues} />
 * </ModalComposition>
 * ```
 */
export function ModalComposition<T = unknown>({
  name,
  children,
  onSubmit,
  title,
  description,
  confirmLabel,
  cancelLabel,
  formId = 'modal-form',
  className,
  beforeOpen,
  afterClose,
  beforeSubmit,
  afterSubmit,
}: ModalCompositionProps<T>) {
  const { i18n } = useLingui()
  const { isOpen, action, payload, close } = useModal<T>(name)
  const mode = useModalStore((state) => state.mode)

  const isDelete = action === 'delete'
  const isCreate = action === 'create'
  const isUpdate = action === 'update'
  const isDuplicate = action === 'duplicate'

  const prevIsOpenRef = useRef(isOpen)

  // Handle beforeOpen
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current && beforeOpen && action) {
      beforeOpen(action, payload)
    }
    prevIsOpenRef.current = isOpen
  }, [isOpen, action, payload, beforeOpen])

  // Handle afterClose
  useEffect(() => {
    if (!isOpen && prevIsOpenRef.current && afterClose && action) {
      afterClose(action, payload)
    }
  }, [isOpen, action, payload, afterClose])

  const handleClose = () => {
    close()
  }

  const handleSubmit = async () => {
    if (!onSubmit || !action) return

    try {
      // Call beforeSubmit
      if (beforeSubmit) {
        await beforeSubmit(action, payload)
      }

      // Call onSubmit
      await onSubmit(action, payload)

      // Call afterSubmit
      if (afterSubmit) {
        await afterSubmit(action, payload)
      }

      close()
    } catch (error) {
      console.error('Modal submit error:', error)
      // Don't close on error
    }
  }

  const getActionTitle = () => {
    if (title) return title
    if (isCreate) return t`Create a new item`
    if (isUpdate) return t`Update an existing item`
    if (isDuplicate) return t`Duplicate an existing item`
    if (isDelete) return t`Are you sure you want to delete this item?`
    return ''
  }

  const getActionDescription = () => {
    if (description) return description
    if (isDelete) {
      return t`This action cannot be undone.`
    }
    return ''
  }

  const getActionIcon = () => {
    if (isCreate) return <Plus className="size-5" />
    if (isUpdate) return <Pencil className="size-5" />
    if (isDuplicate) return <Copy className="size-5" />
    return null
  }

  // Delete action - render AlertDialog
  if (isDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={handleClose}>
        <AlertDialogContent className={className}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {renderTranslatableContent(getActionTitle(), i18n)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {renderTranslatableContent(getActionDescription(), i18n)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {cancelLabel ? (
                renderTranslatableContent(cancelLabel, i18n)
              ) : (
                <Trans>Cancel</Trans>
              )}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {confirmLabel ? (
                renderTranslatableContent(confirmLabel, i18n)
              ) : (
                <Trans>Delete</Trans>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // Create/Update/Duplicate - render Dialog or Sheet
  const content = (
    <ScrollArea className="max-h-[60vh] lg:max-h-fit">
      <div className="space-y-6 p-1">{children}</div>
    </ScrollArea>
  )

  if (mode === 'SHEET') {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className={className} side="right">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2.5">
                {getActionIcon()}
                <h2>{renderTranslatableContent(getActionTitle(), i18n)}</h2>
              </div>
            </SheetTitle>
            {description && (
              <SheetDescription>
                {renderTranslatableContent(description, i18n)}
              </SheetDescription>
            )}
          </SheetHeader>
          {content}
          <SheetFooter>
            <Button type="submit" form={formId} onClick={handleSubmit}>
              {confirmLabel ? (
                renderTranslatableContent(confirmLabel, i18n)
              ) : isCreate ? (
                <Trans>Create</Trans>
              ) : isUpdate ? (
                <Trans>Save Changes</Trans>
              ) : (
                <Trans>Duplicate</Trans>
              )}
            </Button>
            <Button type="button" variant="ghost" onClick={handleClose}>
              {cancelLabel ? (
                renderTranslatableContent(cancelLabel, i18n)
              ) : (
                <Trans>Cancel</Trans>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  // Default: Dialog mode
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2.5">
              {getActionIcon()}
              <h2>{renderTranslatableContent(getActionTitle(), i18n)}</h2>
            </div>
          </DialogTitle>
          {description && (
            <DialogDescription>
              {renderTranslatableContent(description, i18n)}
            </DialogDescription>
          )}
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            {cancelLabel ? (
              renderTranslatableContent(cancelLabel, i18n)
            ) : (
              <Trans>Cancel</Trans>
            )}
          </Button>
          <Button type="submit" form={formId} onClick={handleSubmit}>
            {confirmLabel ? (
              renderTranslatableContent(confirmLabel, i18n)
            ) : isCreate ? (
              <Trans>Create</Trans>
            ) : isUpdate ? (
              <Trans>Save Changes</Trans>
            ) : (
              <Trans>Duplicate</Trans>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
