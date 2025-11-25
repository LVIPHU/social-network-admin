import { t } from '@lingui/core/macro'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { CloudSunIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/theme.provider'

type Props = {
  className?: string
}

const SIZE = 20

export const ThemeSwitch = ({ className }: Props) => {
  const { theme, toggleTheme } = useTheme()

  const variants: Variants = useMemo(() => {
    return {
      light: { x: 0 },
      system: { x: SIZE * -1 },
      dark: { x: SIZE * -2 },
    }
  }, [])

  return (
    <Button
      size="icon"
      variant="ghost"
      className={className}
      onClick={toggleTheme}
    >
      <div
        className="cursor-pointer overflow-hidden"
        style={{ width: SIZE, height: SIZE }}
      >
        <motion.div
          animate={theme}
          variants={variants}
          className="flex space-x-1 p-0.5"
        >
          <SunIcon
            size={SIZE}
            className="shrink-0"
            aria-label={t`Switch to Light Mode`}
          />
          <CloudSunIcon
            size={SIZE}
            className="shrink-0"
            aria-label={t`Use System Theme`}
          />
          <MoonIcon
            size={SIZE}
            className="shrink-0"
            aria-label={t`Switch to Dark Mode`}
          />
        </motion.div>
      </div>
    </Button>
  )
}
