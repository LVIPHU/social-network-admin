import type { MessageDescriptor } from '@lingui/core'
import type { useLingui } from '@lingui/react'

/**
 * Helper function to render label/description from string or MessageDescriptor
 */
export function renderTranslatableContent(
  content: string | MessageDescriptor | React.ReactNode | undefined,
  i18n: ReturnType<typeof useLingui>['i18n'],
): React.ReactNode {
  if (!content) return null
  if (typeof content === 'string') return content
  if (typeof content === 'object' && content !== null && 'id' in content) {
    return i18n._(content)
  }
  return content
}
