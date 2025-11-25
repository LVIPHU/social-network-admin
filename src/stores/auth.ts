import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { AuthResponseDto } from '@/packages/models/auth'
import type { ProfileDto } from '@/packages/models/profile'

type AuthState = {
  auth: AuthResponseDto | null
  profile: ProfileDto | null
}

type AuthActions = {
  setAuth: (auth: AuthResponseDto | null) => void
  setProfile: (profile: ProfileDto | null) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (auth) => {
        set({ auth })
      },

      profile: null,
      setProfile: (profile) => {
        set({ profile })
      },
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) },
  ),
)
