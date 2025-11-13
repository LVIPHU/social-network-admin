import { Outlet } from '@tanstack/react-router'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx'
import { AppSidebar } from '@/components/organisms/app-sidebar'
import AppHeader from '@/components/organisms/app-header'

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
