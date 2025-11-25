import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { METRICS_KEY } from '@/constants/query-keys.constants.ts'
import { axios } from '@/packages/libs/axios.ts'
import type { MetricData } from '@/types/report.type.ts'

export const getMetrics = async () => {
  const response = await axios.get<MetricData, AxiosResponse<MetricData>>(
    `/v1/authz/dashboard/user-metric.json`,
  )
  return response.data
}

export const useMetrics = () => {
  const {
    error,
    isPending: loading,
    data: metrics,
  } = useQuery({
    queryKey: [METRICS_KEY],
    queryFn: getMetrics,
  })

  return { metrics: metrics, loading, error }
}
