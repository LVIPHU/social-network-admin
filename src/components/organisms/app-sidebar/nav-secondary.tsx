import * as React from 'react'
import { useLingui } from '@lingui/react'
import type { Navigation } from '@/types/navigation.types'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface NavSecondaryProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup>{
  items: Navigation
}

export default function NavSecondary({
  items,
  ...props
} : NavSecondaryProps) {
  const { i18n } = useLingui()
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.href}>
                  {item.icon ? <item.icon /> : null}
                  <span>{i18n._(item.title)}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
