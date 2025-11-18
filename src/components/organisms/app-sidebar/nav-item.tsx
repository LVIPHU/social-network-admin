import { ChevronRight } from 'lucide-react'
import { useLingui } from '@lingui/react'
import { Link, useLocation } from '@tanstack/react-router'
import type { NavItem, NavSection } from '@/types/navigation.types.ts'
import type { I18n } from '@lingui/core'
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar.tsx'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx'
import ActiveIndicator from '@/components/organisms/app-sidebar/active-indicator.tsx'
import { cn } from '@/packages/utils/styles.ts'

interface NavItemProps {
  data: NavSection
}

export default function NavItem({ data }: NavItemProps) {
  const { i18n } = useLingui()
  const location = useLocation()
  const pathname = location.pathname
  const isActive = pathname.startsWith(data.href)

  return (
    <Collapsible asChild defaultOpen={data.isCollapsed}>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={i18n._(data.title)}
          className={cn(
            'h-11 py-3 px-4 font-medium',
            isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
          )}
        >
          <Link to={data.href}>
            {data.icon ? <data.icon /> : null}
            <span>{i18n._(data.title)}</span>
            {isActive && <ActiveIndicator className="ml-auto" />}
          </Link>
        </SidebarMenuButton>
        <SubItem data={data.items} i18n={i18n} />
      </SidebarMenuItem>
    </Collapsible>
  )
}

interface SubItemProps {
  data?: ReadonlyArray<NavItem>
  i18n: I18n
}

function SubItem({ data, i18n }: SubItemProps) {
  if (!data || !data.length) return null
  return (
    <>
      <CollapsibleTrigger asChild>
        <SidebarMenuAction className="data-[state=open]:rotate-90">
          <ChevronRight />
          <span className="sr-only">Toggle</span>
        </SidebarMenuAction>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {data.map((subItem) => (
            <SidebarMenuSubItem key={subItem.id}>
              <SidebarMenuSubButton asChild>
                <Link to={subItem.href}>
                  <span>{i18n._(subItem.title)}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </>
  )
}
