import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router'

import { H1 } from '@/components/atoms/heading.tsx'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
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
      <div className="w-full flex flex-col @xl/main:flex-row items-start gap-4 justify-center">
        <NavigationMenu className="hidden @xl/main:block">
          <NavigationMenuList className="flex-col gap-1">
            {SETTINGS_NAVIGATION_ITEMS.map((item) => (
              <NavigationItem key={item.id} item={item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <SelectItems items={SETTINGS_NAVIGATION_ITEMS} />

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
          aria-label={item.id}
          className="@xl/main:min-w-3xs text-sidebar-accent-foreground"
        >
          {item.icon ? <item.icon /> : null}
          <span>{i18n._(item.title)}</span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function SelectItems({ items }: { items: ReadonlyArray<NavItem> }) {
  const { i18n } = useLingui()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Tìm item hiện tại dựa trên pathname
  const currentItem = items.find((item) => pathname === item.href || pathname.endsWith(item.href))
  const value = currentItem?.href || ''

  const handleValueChange = (newValue: string) => {
    const selectedItem = items.find((item) => item.href === newValue)
    if (selectedItem) {
      void navigate({ to: selectedItem.href })
    }
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        className="flex w-full @xl/main:hidden"
        size="sm"
        aria-label="Select settings section"
      >
        <SelectValue placeholder={i18n._(msg`Select a section`)} />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {items.map((item) => (
          <SelectItem
            key={item.id}
            value={item.href}
            className="rounded-lg"
            aria-label={item.id}
          >
            <div className="flex items-center gap-2">
              {item.icon ? <item.icon className="h-4 w-4" /> : null}
              <span>{i18n._(item.title)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
