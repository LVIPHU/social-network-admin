import { useQuery } from '@tanstack/react-query'
import { usersSchema } from '@/packages/models/user/users.model'
import { axios } from '@/packages/libs/axios'

export const LIST_USERS = ['users', 'list'] as const

type GetUsersParams = {
  search?: string
  page: number
  limit: number
}

export const getUsers = async (params: GetUsersParams) => {
  const response = await axios.get<unknown>('/v1/authz/user/users.json', {
    params,
  })
  // Validate response with Zod schema
  const validatedData = usersSchema.safeParse(response.data)
  return validatedData.data
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
