import { useMediaQuery } from '../use-media-query'
import { MOBILE_BREAKPOINT } from '@/constants/breakpoint.constants'

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, {
    defaultValue: false,
    initializeWithValue: false,
  })
}
