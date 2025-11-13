import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { AxiosResponse } from 'axios'
import type { AuthResponseDto, SignInDto } from '@/packages/models'
import { axios } from '@/packages/libs/axios.ts'
import { queryClient } from '@/packages/libs/query-client.ts'
import { useAuthStore } from '@/stores/auth'

export const signIn = async (data: SignInDto) => {
  const response = await axios.post<
    AuthResponseDto,
    AxiosResponse<AuthResponseDto>,
    SignInDto
  >('/auth/sign-in', data)
  console.log(response)
  return {
    status: true,
    user: {
      name: 'Lương Vĩ Phú',
      picture: '',
      username: 'Phu',
      email: 'lviphu@gmail.com',
      locale: 'en',
    },
  }
}

export const useSignIn = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)
  // Get redirect parameter from sign-in route
  const search = useSearch({ from: '/auth/sign-in/' })

  const {
    error,
    isPending: loading,
    mutateAsync: signInFn,
  } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setUser(data.user)
      queryClient.setQueryData(['user'], data.user)

      // Redirect to the original page or dashboard
      void navigate({
        to: (search as { redirect?: string })?.redirect || '/dashboard',
      })
    },
  })

  return { signIn: signInFn, loading, error }
}
