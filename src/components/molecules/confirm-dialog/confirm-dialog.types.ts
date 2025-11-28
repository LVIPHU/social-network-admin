import type { MessageDescriptor } from '@lingui/core'
import type { ReactNode } from 'react'

/**
 * Configuration for ConfirmDialog
 */
export interface ConfirmDialogConfig {
  /** Dialog title */
  title?: ReactNode | MessageDescriptor
  /** Dialog description */
  description?: ReactNode | MessageDescriptor
  /** Confirm button label */
  confirmLabel?: ReactNode | MessageDescriptor
  /** Cancel button label */
  cancelLabel?: ReactNode | MessageDescriptor
  /** Confirm handler */
  onConfirm: () => void | Promise<void>
  /** Cancel handler */
  onCancel?: () => void
  /** Button variant */
  variant?: 'default' | 'destructive'
  /** Loading state */
  loading?: boolean
}

/**
 * Props for ConfirmDialog component
 */
export interface ConfirmDialogProps extends Partial<ConfirmDialogConfig> {
  /** Control visibility (if not using store) */
  open?: boolean
  /** Change handler (if not using store) */
  onOpenChange?: (open: boolean) => void
  /** Use store instead of props (default: false) */
  useStore?: boolean
  /** Children to wrap (button trigger) */
  children?: ReactNode
}
