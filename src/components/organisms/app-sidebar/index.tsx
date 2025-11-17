import * as React from 'react'
import NavMain from './nav-main'
import NavUser from './nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/atoms/logo'
import {
  NAVIGATION_ITEMS,
  USER_NAVIGATION_ITEMS,
} from '@/constants/navigation.constants'
import { useAuthStore } from '@/stores/auth'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()
  return (
    <Sidebar collapsible='icon' variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="">
                <Logo />
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
        <NavMain items={NAVIGATION_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} items={USER_NAVIGATION_ITEMS} />}
      </SidebarFooter>
    </Sidebar>
  )
}
