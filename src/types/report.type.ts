export interface MetricData {
  total_users: string
  user_growth_percent: number
  new_users: string
  new_users_growth_percent: number
  total_posts: string
  posts_growth_percent: number
}

export interface MetricResponse {
  status: string
  message: string
  data: MetricData
}
