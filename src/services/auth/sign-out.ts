import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth'
import { queryClient } from '@/packages/libs/query-client'
import { axios } from '@/packages/libs/axios'

export const signOut = () => axios.post('/auth/sign-out')

export const useSignOut = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const {
    error,
    isPending: loading,
    mutateAsync: signOutFn,
  } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setUser(null)
      queryClient.clear()

      void navigate({
        to: '/auth/sign-in',
        search: {
          redirect: undefined,
        },
        replace: true,
      })
    },
    onError: () => {
      setUser(null)
      queryClient.clear()

      void navigate({
        to: '/auth/sign-in',
        search: {
          redirect: undefined,
        },
        replace: true,
      })
    },
  })

  return { signOut: signOutFn, loading, error }
}
