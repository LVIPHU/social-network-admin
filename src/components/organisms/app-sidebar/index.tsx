import * as React from 'react'
import { Bolt } from 'lucide-react'
import { msg } from '@lingui/core/macro'
import { NavMain } from './nav-main'
import NavSecondary from './nav-secondary'
import NavUser from './nav-user'
import type { Navigation } from '@/types/navigation.types'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/atoms/logo.tsx'
import { NAVIGATION_ITEMS } from '@/constants/navigation.constants.ts'
import { useAuthStore } from '@/stores/auth'

const data = {
  navMain: NAVIGATION_ITEMS,
  navSecondary: [
    {
      id: 'config',
      title: msg`Config`,
      href: '/config',
      icon: Bolt,
    },
  ] as Navigation,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="">
                <Logo size={32} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">TBC Admin</span>
                  <span className="truncate text-xs">Social Network</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  )
}
