import { msg } from '@lingui/core/macro'
import {
  BadgeCheckIcon,
  BellIcon,
  BoltIcon,
  CalendarIcon,
  CircleDollarSignIcon,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  UserStarIcon,
  UsersRoundIcon,
} from 'lucide-react'
import type { NavItem, Navigation } from '@/types/navigation.types'

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
]

export const USER_NAVIGATION_ITEMS: Array<NavItem> = [
  {
    id: 'settings',
    href: '/settings',
    title: msg`Settings`,
    icon: BoltIcon,
  },
  {
    id: 'account',
    href: '/account',
    title: msg`Account`,
    icon: BadgeCheckIcon,
  },
  {
    id: 'notifications',
    href: '/notifications',
    title: msg`Notifications`,
    icon: BellIcon,
  },
]
