import type { Navigation } from '@/types/navigation.type'
import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar'
import NavItem from '@/components/organisms/app-sidebar/nav-item.tsx'

interface NavMainProps {
  items: Navigation
}

export default function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-y-2">
        {items.map((item) => (
          <NavItem key={item.id} data={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
