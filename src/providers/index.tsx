import { Toaster } from 'sonner'
import { Outlet } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/providers/theme.provider'
import { LocaleProvider } from '@/providers/locale.provider'
import { queryClient } from '@/packages/libs/query-client'
import { AuthRefreshProvider } from '@/providers/auth-refresh.provider'
import { HelmetProvider } from 'react-helmet-async'
import { helmetContext } from '@/constants/helmet.constants.ts'

export const Providers = () => (
  <LocaleProvider>
    <HelmetProvider context={helmetContext}>
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
    </HelmetProvider>
  </LocaleProvider>
)
