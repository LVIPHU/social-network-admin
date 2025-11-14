import { msg } from '@lingui/core/macro'
import {
  CalendarIcon,
  CircleDollarSignIcon,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  UsersRoundIcon,
  UserStarIcon,
} from 'lucide-react'
import type { Navigation } from '@/types/navigation.types.ts'

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
    id: 'Event Management',
    href: '/events',
    title: msg`Event Management`,
    icon: CalendarIcon,
  },
  {
    id: 'Content Moderation',
    href: '/content',
    title: msg`Content Moderation`,
    icon: MessageSquareIcon,
  },
  {
    id: 'Donation Management',
    href: '/donations',
    title: msg`Donation Management`,
    icon: CircleDollarSignIcon,
  },
  {
    id: 'NFT Management',
    href: '/nft',
    title: msg`NFT Management`,
    icon: ImageIcon,
  },
  {
    id: 'Admin Management',
    href: '/admin',
    title: msg`Admin Management`,
    icon: UserStarIcon,
  },
]
