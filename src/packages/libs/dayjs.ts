import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(utc)

export const dayjsLocales: Record<string, () => Promise<ILocale>> = {
  en: () => import('dayjs/locale/en'),
  vi: () => import('dayjs/locale/vi'),
  'zh-hans': () => import('dayjs/locale/zh-cn'),
  'zh-hant': () => import('dayjs/locale/zh-tw'),
}
