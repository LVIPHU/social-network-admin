import { Trans } from '@lingui/react/macro'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

import { H1 } from '@/components/atoms/heading'
import SectionCards from '@/components/organisms/section-cards'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart.tsx'
import { useMetrics } from '@/services/reports'

const userGrowthData = [
  { month: 'Jan', newUsers: 120, totalUsers: 1200 },
  { month: 'Feb', newUsers: 150, totalUsers: 1350 },
  { month: 'Mar', newUsers: 180, totalUsers: 1530 },
  { month: 'Apr', newUsers: 200, totalUsers: 1730 },
  { month: 'May', newUsers: 230, totalUsers: 1960 },
  { month: 'Jun', newUsers: 280, totalUsers: 2240 },
]

const chartConfig = {
  newUsers: {
    label: 'New users',
    color: '#3b82f6',
  },
  totalUsers: {
    label: 'Total users',
    color: '#10b981',
  },
}

export default function DashboardTemplate() {
  const { metrics, loading } = useMetrics()
  return (
    <>
      <div>
        <H1>
          <Trans>Dashboard overview</Trans>
        </H1>
        <p className="text-gray-600">
          <Trans>Social network activity at a glance</Trans>
        </p>
      </div>

      {/* Stats Cards */}
      <SectionCards data={metrics} loading={loading} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User growth</CardTitle>
            <CardDescription>
              Monthly view of new users versus total users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke="var(--color-newUsers)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="totalUsers"
                  stroke="var(--color-totalUsers)"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly new users</CardTitle>
            <CardDescription>
              Bar chart showing new user acquisition by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="newUsers" fill="var(--color-newUsers)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
