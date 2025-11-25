import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/packages/libs/query-client'
import { AuthRefreshProvider } from '@/providers/auth-refresh.provider'
import { LocaleProvider } from '@/providers/locale.provider'
import { ThemeProvider } from '@/providers/theme.provider'

export const Providers = () => (
  <LocaleProvider>
    <QueryClientProvider client={queryClient}>
      <AuthRefreshProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Outlet />
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          </TooltipProvider>
        </ThemeProvider>
      </AuthRefreshProvider>
    </QueryClientProvider>
  </LocaleProvider>
)
