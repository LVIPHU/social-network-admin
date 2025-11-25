import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { axios } from '@/packages/libs/axios.ts'
import type { ProfileDto } from '@/packages/models/profile'
import { useAuthStore } from '@/stores/auth.ts'

import { PROFILE_KEY } from './constants.ts'

export const getProfile = async () => {
  const response = await axios.get<ProfileDto, AxiosResponse<ProfileDto>>(
    '/v1/authz/auth/get-admin-profile.json',
  )
  return response.data
}

export const useProfile = () => {
  const setProfile = useAuthStore((state) => state.setProfile)

  const {
    error,
    isPending: loading,
    data: profile,
  } = useQuery({
    queryKey: [PROFILE_KEY],
    queryFn: getProfile,
  })

  useEffect(() => {
    setProfile(profile ?? null)
  }, [profile, setProfile])

  return { profile: profile, loading, error }
}
