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
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
} from '@/constants/layout.constants.ts'
import type {
  SidebarCollapsible,
  SidebarVariant,
} from '@/constants/layout.constants.ts'
import {
  NAVIGATION_ITEMS,
  USER_NAVIGATION_ITEMS,
} from '@/constants/navigation.constants'
import { getPreference } from '@/packages/utils/cookie.ts'
import { useProfile } from '@/services/profile'

import NavMain from './nav-main'
import NavProfile from './nav-profile'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile } = useProfile()

  const sidebarVariant = getPreference<SidebarVariant>(
    'sidebar_variant',
    SIDEBAR_VARIANT_VALUES,
    'inset',
  )
  const sidebarCollapsible = getPreference<SidebarCollapsible>(
    'sidebar_collapsible',
    SIDEBAR_COLLAPSIBLE_VALUES,
    'icon',
  )

  return (
    <Sidebar
      collapsible={sidebarCollapsible}
      variant={sidebarVariant}
      {...props}
    >
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
