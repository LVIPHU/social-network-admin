import { useQuery } from '@tanstack/react-query'

import { LIST_USERS } from '@/constants/query-keys.constants.ts'
import { axios } from '@/packages/libs/axios.ts'
import type { PaginationDto } from '@/packages/models/shared'
import type { UserDto } from '@/packages/models/user'

type GetUsersParams = {
  search?: string
  status?: Array<string>
  page: number
  limit: number
}

export const getUsers = async (params: GetUsersParams) => {
  const response = await axios.get<{
    data: Array<UserDto>
    pagination: PaginationDto
  }>('/v1/authz/user/users.json', {
    params,
  })
  return response.data
}

export const useUsers = (params: GetUsersParams) => {
  const {
    error,
    isPending: loading,
    data,
  } = useQuery({
    queryKey: [LIST_USERS, params],
    queryFn: () => getUsers(params),
  })

  return { users: data, loading, error }
}
