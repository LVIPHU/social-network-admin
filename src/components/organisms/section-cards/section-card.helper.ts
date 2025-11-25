import { msg } from '@lingui/core/macro'
import {
  HashIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react'

import type {
  GrowthStatus,
  SectionItem,
} from '@/components/organisms/section-cards/index.tsx'
import { formatNumber } from '@/packages/utils/number.ts'
import type { MetricData } from '@/types/report.type.ts'

const initialData: Array<
  SectionItem & { valueKey: string; percentKey: string }
> = [
  {
    valueKey: 'total_users',
    percentKey: 'user_growth_percent',
    title: msg`Total users`,
    information: msg`compared with the previous month`,
    value: 0,
    percent: 0,
    growthStatus: 'neutral',
    icon: UsersIcon,
  },
  {
    valueKey: 'new_users',
    percentKey: 'new_users_growth_percent',
    title: msg`New users`,
    information: msg`compared with the previous month`,
    value: 0,
    percent: 0,
    growthStatus: 'neutral',
    icon: TrendingUpIcon,
  },
  {
    valueKey: 'total_posts',
    percentKey: 'posts_growth_percent',
    title: msg`Total posts`,
    information: msg`compared with the previous month`,
    value: 0,
    percent: 0,
    growthStatus: 'neutral',
    icon: MessageSquareIcon,
  },
  {
    valueKey: 'hashtags',
    percentKey: 'hashtags_growth_percent',
    title: msg`Active hashtags`,
    information: msg`new hashtags this month`,
    value: 0,
    percent: 0,
    growthStatus: 'neutral',
    icon: HashIcon,
  },
]

function formatMetricValue(
  input: number | string,
  opts?: {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    noDecimals?: boolean
    showSign?: boolean
  },
) {
  const value = typeof input === 'string' ? Number(input) : input
  if (Number.isNaN(value)) return '--'
  const { showSign = true } = opts ?? {}
  if (showSign) {
    if (value < 0) `-${formatNumber(value, opts)}`
    else if (value > 0) return `+${formatNumber(value, opts)}`
  }
  return formatNumber(value, opts)
}

export function convertMetricData(
  data?: MetricData,
  locale?: string,
): Array<SectionItem> {
  if (!data) return initialData
  return initialData.map((item) => {
    const rawValue = data[item.valueKey as keyof MetricData]
    const rawPercent = data[item.percentKey as keyof MetricData]

    const numericPercent =
      typeof rawPercent === 'string' ? Number(rawPercent) : rawPercent
    let growthStatus: GrowthStatus = 'neutral'
    if (!Number.isNaN(numericPercent)) {
      if (numericPercent > 0) growthStatus = 'up'
      else if (numericPercent < 0) growthStatus = 'down'
    }

    return {
      ...item,
      value: formatMetricValue(rawValue, {
        locale: locale,
        showSign: false,
      }),
      percent: formatMetricValue(rawPercent, {
        locale: locale,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
      growthStatus,
    }
  })
}
