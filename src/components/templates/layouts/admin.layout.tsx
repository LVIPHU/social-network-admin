import { Outlet } from '@tanstack/react-router'

import AppHeader from '@/components/organisms/app-header'
import { AppSidebar } from '@/components/organisms/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx'

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="@container/main flex flex-1 flex-col gap-4 md:gap-6 p-4 md:p-6 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
