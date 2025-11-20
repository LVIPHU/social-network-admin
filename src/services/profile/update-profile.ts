import { useMutation } from '@tanstack/react-query'
import { PROFILE_KEY } from './index.ts'
import type { AxiosResponse } from 'axios'
import type { ProfileDto, UpdateProfileDto } from '@/packages/models'
import { axios } from '@/packages/libs/axios.ts'
import { queryClient } from '@/packages/libs/query-client.ts'

export const updateProfile = async (data: UpdateProfileDto) => {
  const response = await axios.patch<
    ProfileDto,
    AxiosResponse<ProfileDto>,
    UpdateProfileDto
  >('/v1/authz/auth/update-admin-profile', data)

  return response.data
}

export const useUpdateProfile = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateProfileFn,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData([PROFILE_KEY], data)
    },
  })

  return { updateProfile: updateProfileFn, loading, error }
}
