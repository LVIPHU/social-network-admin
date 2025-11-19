import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { AuthResponseDto, SignInDto } from '@/packages/models'
import type { AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { axios } from '@/packages/libs/axios.ts'

export const signIn = async (data: SignInDto) => {
  const response = await axios.post<
    AuthResponseDto,
    AxiosResponse<AuthResponseDto>,
    SignInDto
  >('/v1/public/login', data)

  return response.data
}

export const useSignIn = () => {
  const navigate = useNavigate()
  const search = useSearch({ from: '/auth/sign-in/' })
  const setAuth = useAuthStore((state) => state.setAuth)

  const {
    error,
    isPending: loading,
    mutateAsync: signInFn,
  } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setAuth(data)

      // Redirect to the original page or dashboard
      void navigate({
        to: (search as { redirect?: string }).redirect || '/dashboard',
      })
    },
  })

  return { signIn: signInFn, loading, error }
}
