import type { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'
import {
  TrendingDownIcon,
  TrendingUpDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useMemo } from 'react'

import { convertMetricData } from '@/components/organisms/section-cards/section-card.helper.ts'
import { Badge } from '@/components/ui/badge.tsx'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import type { MetricData } from '@/types/report.type.ts'

export type GrowthStatus = 'up' | 'down' | 'neutral'

export interface SectionItem {
  title: MessageDescriptor
  value: string | number
  percent: string | number
  growthStatus: GrowthStatus
  information: MessageDescriptor
  icon: LucideIcon
}

interface SectionCardsProps {
  data?: MetricData
  loading?: boolean
}

export default function SectionCards({ data }: SectionCardsProps) {
  const { i18n } = useLingui()
  const convertData = useMemo(() => convertMetricData(data), [data])

  const variantBadge: Record<GrowthStatus, any> = {
    up: 'success',
    down: 'danger',
    neutral: 'warning',
  }

  const variantText: Record<GrowthStatus, string> = {
    up: 'text-primary',
    down: 'text-destructive',
    neutral: 'text-amber-500',
  }

  const variantIcon: Record<GrowthStatus, LucideIcon> = {
    up: TrendingUpIcon,
    down: TrendingDownIcon,
    neutral: TrendingUpDownIcon,
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {convertData.map((item, idx) => {
        const IconComponent = variantIcon[item.growthStatus]
        return (
          <Card key={idx} className="@container/card">
            <CardHeader>
              <CardDescription>{i18n._(item.title)}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.value}
              </CardTitle>
              <CardAction>
                <Badge
                  variant={variantBadge[item.growthStatus]}
                  className="flex items-center gap-1 rounded-md"
                >
                  {item.percent}%
                  <IconComponent className="size-4" />
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                <span className={variantText[item.growthStatus]}>
                  {item.percent}%
                </span>{' '}
                {i18n._(item.information)} <IconComponent className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Meets growth projections
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
