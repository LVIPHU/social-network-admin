import { Outlet } from '@tanstack/react-router'
import { Logo } from '@/components/atoms/logo.tsx'
import { LocaleSwitch } from '@/components/atoms/locale-switch.tsx'
import { ThemeSwitch } from '@/components/atoms/theme-switch.tsx'

export function AuthLayout() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Logo />
            TBC Admin
          </a>
          <div className="space-x-2 text-right lg:p-12 lg:text-center">
            <LocaleSwitch />
            <ThemeSwitch />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/backgrounds/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </main>
  )
}
