import { msg } from '@lingui/core/macro'
import { i18n } from '@lingui/core'
import _axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { toast } from 'sonner'
import { queryClient } from './query-client'
import type { AxiosRequestHeaders } from 'axios'
import type { ErrorMessage } from '@/packages/utils/error'
import { translateError } from '@/services/errors/translate-error'
import { refreshToken } from '@/services/auth'
import { deepSearchAndParseDates } from '@/packages/utils/date'
import { router } from '@/main'
import { useAuthStore } from '@/stores/auth.ts'
import { PROFILE_KEY } from '@/services/profile'

export const axios = _axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000,
})

axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().auth?.access_token
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders
  }
  return config
})

// Intercept responses to transform ISO dates to JS date objects
axios.interceptors.response.use(
  (response) => {
    const transformedResponse = deepSearchAndParseDates(response.data, [
      'created_at',
      'updated_at',
    ])
    return { ...response, data: transformedResponse }
  },
  (error) => {
    const message = error.response?.data.message as ErrorMessage
    const description = translateError(message)

    if (description) {
      toast.error(i18n._(msg`Oops, the server returned an error.`), {
        description: i18n._(description),
      })
    }

    return Promise.reject(new Error(message))
  },
)

// Create another instance to handle failed refresh tokens
// Reference: https://github.com/Flyrell/axios-auth-refresh/issues/191
const axiosForRefresh = _axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000,
})

// Interceptor to handle expired access token errors
const handleAuthError = () => refreshToken(axiosForRefresh)

// Interceptor to handle expired refresh token errors
const handleRefreshError = async () => {
  await queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] })
  await router.navigate({
    to: '/auth/sign-in',
    search: {
      redirect: undefined,
    },
  })
}

// Intercept responses to check for 401 and 403 errors, refresh token and retry the request
createAuthRefreshInterceptor(axios, handleAuthError, {
  statusCodes: [401, 403],
})
createAuthRefreshInterceptor(axiosForRefresh, handleRefreshError)
