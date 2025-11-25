import { MOBILE_BREAKPOINT } from '@/constants/breakpoint.constants'

import { useMediaQuery } from '../use-media-query'

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, {
    defaultValue: false,
    initializeWithValue: false,
  })
}
