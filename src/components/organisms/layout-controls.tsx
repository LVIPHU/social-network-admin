import { Label } from '@/components/ui/label.tsx'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'
import {
  NAVBAR_STYLE_VALUES,
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
} from '@/constants/layout.constants.ts'
import type {
  NavbarStyle,
  SidebarCollapsible,
  SidebarVariant,
} from '@/constants/layout.constants.ts'
import { getPreference, setValueToCookie } from '@/packages/utils/cookie.ts'
import { updateNavbarStyle } from '@/packages/utils/misc/layout.ts'

export default function LayoutControls() {
  const [sidebarVariant, sidebarCollapsible, navbarStyle] = [
    getPreference<SidebarVariant>(
      'sidebar_variant',
      SIDEBAR_VARIANT_VALUES,
      'inset',
    ),
    getPreference<SidebarCollapsible>(
      'sidebar_collapsible',
      SIDEBAR_COLLAPSIBLE_VALUES,
      'icon',
    ),
    getPreference<NavbarStyle>('navbar_style', NAVBAR_STYLE_VALUES, 'scroll'),
  ]

  const handleValueChange = (key: string, value: any) => {
    if (key === 'navbar_style') {
      updateNavbarStyle(value)
    }
    setValueToCookie(key, value)
    window.location.reload()
  }
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-4">
        <Label className="font-medium">Sidebar Variant</Label>
        <ToggleGroup
          className="w-full **:data-[slot=toggle-group-item]:flex-1"
          variant="outline"
          type="single"
          value={sidebarVariant}
          onValueChange={(value) => handleValueChange('sidebar_variant', value)}
        >
          <ToggleGroupItem value="inset" aria-label="Toggle inset">
            Inset
          </ToggleGroupItem>
          <ToggleGroupItem value="sidebar" aria-label="Toggle sidebar">
            Sidebar
          </ToggleGroupItem>
          <ToggleGroupItem value="floating" aria-label="Toggle floating">
            Floating
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-4">
        <Label className="font-medium">Navbar Style</Label>
        <ToggleGroup
          className="w-full **:data-[slot=toggle-group-item]:flex-1"
          variant="outline"
          type="single"
          value={navbarStyle}
          onValueChange={(value) => handleValueChange('navbar_style', value)}
        >
          <ToggleGroupItem value="sticky" aria-label="Toggle sticky">
            Sticky
          </ToggleGroupItem>
          <ToggleGroupItem value="scroll" aria-label="Toggle scroll">
            Scroll
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-4">
        <Label className="font-medium">Sidebar Collapsible</Label>
        <ToggleGroup
          className="w-full **:data-[slot=toggle-group-item]:flex-1"
          variant="outline"
          type="single"
          value={sidebarCollapsible}
          onValueChange={(value) =>
            handleValueChange('sidebar_collapsible', value)
          }
        >
          <ToggleGroupItem value="icon" aria-label="Toggle icon">
            Icon
          </ToggleGroupItem>
          <ToggleGroupItem value="offcanvas" aria-label="Toggle offcanvas">
            OffCanvas
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
