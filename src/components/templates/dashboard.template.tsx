import { Trans } from '@lingui/react/macro'
import {
  CalendarIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react'
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

// Mock data
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
  return (
    <div className="space-y-6">
      <div>
        <H1 className="text-2xl font-bold text-gray-900">
          <Trans>Dashboard overview</Trans>
        </H1>
        <p className="text-gray-600">
          <Trans>Social network activity at a glance</Trans>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,240</div>
            <p className="text-xs text-muted-foreground">
              +12.5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New users</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">280</div>
            <p className="text-xs text-muted-foreground">
              +21.7% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total posts</CardTitle>
            <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,943</div>
            <p className="text-xs text-muted-foreground">+8.2% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Topics</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 new topics</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  )
}
