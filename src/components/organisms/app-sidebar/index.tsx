import * as React from 'react'

import { Logo } from '@/components/atoms/logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  NAVIGATION_ITEMS,
  USER_NAVIGATION_ITEMS,
} from '@/constants/navigation.constants'
import { useProfile } from '@/services/profile'

import NavMain from './nav-main'
import NavProfile from './nav-profile'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile } = useProfile()
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
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
        {profile && (
          <NavProfile profile={profile} items={USER_NAVIGATION_ITEMS} />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
