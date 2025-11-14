import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth'
import { queryClient } from '@/packages/libs/query-client'
import { axios } from '@/packages/libs/axios'

export const signOut = () => axios.post('/auth/sign-out')

export const useSignOut = () => {
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
    },
    onError: () => {
      setUser(null)
      queryClient.clear()
    },
  })

  return { signOut: signOutFn, loading, error }
}
