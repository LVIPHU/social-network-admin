import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { AuthResponseDto } from '@/packages/models'

type AuthState = {
  auth: AuthResponseDto | null
}

type AuthActions = {
  setAuth: (auth: AuthResponseDto | null) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (auth) => {
        set({ auth })
      },
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) },
  ),
)
