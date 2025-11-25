import { msg } from '@lingui/core/macro'
import {
  BellIcon,
  CalendarIcon,
  CircleDollarSignIcon,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  UserStarIcon,
  UsersRoundIcon,
  WrenchIcon,
} from 'lucide-react'

import type { NavItem, Navigation } from '@/types/navigation.type'

export const NAVIGATION_ITEMS: Navigation = [
  {
    id: 'dashboard',
    href: '/dashboard',
    title: msg`Dashboard`,
    icon: LayoutDashboardIcon,
  },
  {
    id: 'user-management',
    href: '/users',
    title: msg`User Management`,
    icon: UsersRoundIcon,
  },
  {
    id: 'event-management',
    href: '/events',
    title: msg`Event Management`,
    icon: CalendarIcon,
  },
  {
    id: 'content-moderation',
    href: '/content',
    title: msg`Content Moderation`,
    icon: MessageSquareIcon,
  },
  {
    id: 'donation-management',
    href: '/donations',
    title: msg`Donation Management`,
    icon: CircleDollarSignIcon,
  },
  {
    id: 'nft-management',
    href: '/nft',
    title: msg`NFT Management`,
    icon: ImageIcon,
  },
  {
    id: 'admin-management',
    href: '/admin',
    title: msg`Admin Management`,
    icon: UserStarIcon,
  },
  {
    id: 'settings',
    href: '/settings',
    title: msg`Settings`,
    icon: SettingsIcon,
  },
]

export const USER_NAVIGATION_ITEMS: Array<NavItem> = [
  {
    id: 'profile',
    href: '/settings/profile',
    title: msg`Profile`,
    icon: UserIcon,
  },
  {
    id: 'notifications',
    href: '/notifications',
    title: msg`Notifications`,
    icon: BellIcon,
  },
]

export const SETTINGS_NAVIGATION_ITEMS: Array<NavItem> = [
  {
    id: 'general',
    href: '/settings',
    title: msg`General`,
    icon: WrenchIcon,
  },
  {
    id: 'profile',
    href: '/settings/profile',
    title: msg`Profile`,
    icon: UserIcon,
  },
]
