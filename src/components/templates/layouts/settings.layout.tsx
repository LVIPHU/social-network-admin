import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { Link, Outlet, useLocation } from '@tanstack/react-router'

import { H1 } from '@/components/atoms/heading.tsx'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx'
import { SETTINGS_NAVIGATION_ITEMS } from '@/constants/navigation.constants.ts'
import { cn } from '@/packages/utils/styles.ts'
import type { NavItem } from '@/types/navigation.type.ts'

export default function SettingsLayout() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6">
      <div>
        <H1>
          <Trans>Setting</Trans>
        </H1>
        <p className="text-gray-600">
          <Trans>Update account preferences and manage integrations.</Trans>
        </p>
      </div>
      <div className="w-full flex flex-row items-start gap-4 justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex-col gap-1">
            {SETTINGS_NAVIGATION_ITEMS.map((item) => (
              <NavigationItem key={item.id} item={item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 w-full gap-4 md:gap-6 px-4 md:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function NavigationItem({ item }: { item: NavItem }) {
  const { i18n } = useLingui()
  const { pathname } = useLocation()
  const isActive = pathname.endsWith(item.href)
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        data-active={isActive}
        className={cn(
          navigationMenuTriggerStyle(),
          'flex flex-row! justify-start',
        )}
        asChild
      >
        <Link
          to={item.href}
          className="lg:min-w-3xs text-sidebar-accent-foreground"
        >
          {item.icon ? <item.icon /> : null}
          <span>{i18n._(item.title)}</span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
