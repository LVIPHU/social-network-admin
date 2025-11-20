import { useQuery } from '@tanstack/react-query'
import { METRICS_KEY } from './index.tsx'
import type { AxiosResponse } from 'axios'
import type { MetricData } from '@/types/report.type.ts'
import { axios } from '@/packages/libs/axios.ts'

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
