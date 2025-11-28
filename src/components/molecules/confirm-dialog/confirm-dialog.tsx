import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { useEffect, useState } from 'react'

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
import { useConfirmDialog } from '@/stores/confirm-dialog'

import type { ConfirmDialogProps } from './confirm-dialog.types'

/**
 * ConfirmDialog - Component for confirming actions
 *
 * Can be used standalone with props or with store for global state management.
 *
 * @example
 * ```tsx
 * // Standalone usage
 * <ConfirmDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title={t`Delete item?`}
 *   description={t`This action cannot be undone.`}
 *   onConfirm={handleDelete}
 * />
 *
 * // With store
 * const { open } = useConfirmDialog()
 * <Button onClick={() => open({ title: t`Delete?`, onConfirm: handleDelete })}>
 *   Delete
 * </Button>
 * ```
 */
export function ConfirmDialog({
  open: openProp,
  onOpenChange: onOpenChangeProp,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  variant = 'destructive',
  loading = false,
  useStore = false,
  children,
}: ConfirmDialogProps) {
  const { i18n } = useLingui()
  const store = useConfirmDialog()

  // Use store or props
  const isOpen = useStore ? store.isOpen : (openProp ?? false)
  const config = useStore ? store.config : null

  // Merge store config with props (props take precedence)
  const finalTitle = title ?? config?.title
  const finalDescription = description ?? config?.description
  const finalConfirmLabel = confirmLabel ?? config?.confirmLabel
  const finalCancelLabel = cancelLabel ?? config?.cancelLabel
  const finalOnConfirm = onConfirm ?? config?.onConfirm
  const finalOnCancel = onCancel ?? config?.onCancel
  const finalVariant = variant ?? config?.variant ?? 'destructive'
  const finalLoading = loading ?? config?.loading ?? false

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    if (useStore) {
      if (newOpen) {
        // Store will handle opening
      } else {
        store.close()
      }
    } else {
      onOpenChangeProp?.(newOpen)
    }
  }

  const handleConfirm = async () => {
    if (!finalOnConfirm) return

    try {
      setIsSubmitting(true)
      await finalOnConfirm()
      handleOpenChange(false)
    } catch (error) {
      console.error('Confirm action error:', error)
      // Don't close on error, let user retry
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    finalOnCancel?.()
    handleOpenChange(false)
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel()
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handleConfirm()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (children) {
    // Wrap children pattern
    return (
      <>
        {children}
        <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              {finalTitle && (
                <AlertDialogTitle>
                  {renderTranslatableContent(finalTitle, i18n)}
                </AlertDialogTitle>
              )}
              {finalDescription && (
                <AlertDialogDescription>
                  {renderTranslatableContent(finalDescription, i18n)}
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                {finalCancelLabel ? (
                  renderTranslatableContent(finalCancelLabel, i18n)
                ) : (
                  <Trans>Cancel</Trans>
                )}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                disabled={isSubmitting || finalLoading}
                className={
                  finalVariant === 'destructive'
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : ''
                }
              >
                {isSubmitting || finalLoading ? (
                  <Trans>Processing...</Trans>
                ) : finalConfirmLabel ? (
                  renderTranslatableContent(finalConfirmLabel, i18n)
                ) : (
                  <Trans>Confirm</Trans>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  // Standalone pattern
  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {finalTitle && (
            <AlertDialogTitle>
              {renderTranslatableContent(finalTitle, i18n)}
            </AlertDialogTitle>
          )}
          {finalDescription && (
            <AlertDialogDescription>
              {renderTranslatableContent(finalDescription, i18n)}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {finalCancelLabel ? (
              renderTranslatableContent(finalCancelLabel, i18n)
            ) : (
              <Trans>Cancel</Trans>
            )}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isSubmitting || finalLoading}
            variant={finalVariant === 'destructive' ? 'destructive' : 'default'}
          >
            {isSubmitting || finalLoading ? (
              <Trans>Processing...</Trans>
            ) : finalConfirmLabel ? (
              renderTranslatableContent(finalConfirmLabel, i18n)
            ) : (
              <Trans>Confirm</Trans>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
