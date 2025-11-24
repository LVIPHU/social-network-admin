import { useQuery } from '@tanstack/react-query'
import { LIST_USERS } from './index.ts'
import type { PaginationDto, UserDto } from '@/packages/models'
import { axios } from '@/packages/libs/axios.ts'

type GetUsersParams = {
  search?: string
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
