import type { MessageDto } from '@/packages/models'
import type { AxiosInstance, AxiosResponse } from 'axios'

export const refreshToken = async (axios: AxiosInstance) => {
  const response = await axios.get<MessageDto, AxiosResponse<MessageDto>>(
    '/v1/authz/auth/refresh-token.json',
  )

  return response.data
}
