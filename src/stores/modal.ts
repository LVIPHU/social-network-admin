import { create } from 'zustand'

export type ModalMode = 'DIALOG' | 'SHEET'

export type ModalName = 'user' | 'admin' | 'post'

export type ModalAction = 'create' | 'update' | 'duplicate' | 'delete'

export type ModalPayload<T = unknown> = {
  id: ModalName
  item?: T
}

type Modal<T = unknown> = {
  name: ModalName
  action: ModalAction
  payload?: ModalPayload<T>
}

type ModalState = {
  mode: ModalMode | 'DIALOG'
  dialog: Modal | null
}

type ModalActions = {
  setModal: <T>(dialog: Modal<T> | null) => void
  setMode: (mode: ModalMode) => void
}

export const useModalStore = create<ModalState & ModalActions>()((set) => ({
  dialog: null,
  mode: 'DIALOG',
  setModal: (dialog) => {
    set({ dialog })
  },
  setMode: (mode) => {
    set({ mode })
  },
}))

export const useModal = <T = unknown>(name: ModalName) => {
  const dialog = useModalStore((state) => {
    return state.dialog?.name === name ? state.dialog : null
  })

  return {
    isOpen: !!dialog,
    action: dialog?.action,
    payload: dialog?.payload as ModalPayload<T>,
    open: (action: ModalAction, payload?: ModalPayload<T>) => {
      useModalStore.setState({ dialog: { name, action, payload } })
    },
    close: () => {
      useModalStore.setState({ dialog: null })
    },
  }
}
