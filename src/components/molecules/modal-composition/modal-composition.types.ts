import type { MessageDescriptor } from '@lingui/core'
import type { ReactNode } from 'react'

import type { ModalAction, ModalName, ModalPayload } from '@/stores/modal'

/**
 * Props for ModalComposition component
 */
export interface ModalCompositionProps<T = unknown> {
  /** Modal name to match with store */
  name: ModalName
  /** Modal content */
  children: ReactNode
  /** Submit handler - receives action and payload */
  onSubmit?: (
    action: ModalAction,
    payload?: ModalPayload<T>,
  ) => void | Promise<void>
  /** Custom title */
  title?: ReactNode | MessageDescriptor
  /** Custom description */
  description?: ReactNode | MessageDescriptor
  /** Label for confirm button */
  confirmLabel?: ReactNode | MessageDescriptor
  /** Label for cancel button */
  cancelLabel?: ReactNode | MessageDescriptor
  /** Form ID to link with FormComposition */
  formId?: string
  /** Additional CSS classes */
  className?: string
  /** Callback before modal opens */
  beforeOpen?: (
    action: ModalAction,
    payload?: ModalPayload<T>,
  ) => void | Promise<void>
  /** Callback after modal closes */
  afterClose?: (
    action: ModalAction,
    payload?: ModalPayload<T>,
  ) => void | Promise<void>
  /** Callback before submit */
  beforeSubmit?: (
    action: ModalAction,
    payload?: ModalPayload<T>,
  ) => void | Promise<void>
  /** Callback after submit */
  afterSubmit?: (
    action: ModalAction,
    payload?: ModalPayload<T>,
  ) => void | Promise<void>
}
