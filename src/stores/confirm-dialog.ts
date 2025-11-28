import { create } from 'zustand'

import type { ConfirmDialogConfig } from '@/components/molecules/confirm-dialog/confirm-dialog.types'

type ConfirmDialogState = {
  isOpen: boolean
  config: ConfirmDialogConfig | null
}

type ConfirmDialogActions = {
  open: (config: ConfirmDialogConfig) => void
  close: () => void
  setLoading: (loading: boolean) => void
}

export const useConfirmDialogStore = create<
  ConfirmDialogState & ConfirmDialogActions
>()((set) => ({
  isOpen: false,
  config: null,
  open: (config) => {
    set({ isOpen: true, config })
  },
  close: () => {
    set({ isOpen: false, config: null })
  },
  setLoading: (loading) => {
    set((state) => ({
      config: state.config ? { ...state.config, loading } : null,
    }))
  },
}))

/**
 * Hook to use confirm dialog with store
 */
export const useConfirmDialog = () => {
  const store = useConfirmDialogStore()

  return {
    isOpen: store.isOpen,
    config: store.config,
    open: store.open,
    close: store.close,
    setLoading: store.setLoading,
  }
}
