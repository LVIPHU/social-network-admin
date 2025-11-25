import Cookies from 'js-cookie'

export function getValueFromCookie(key: string): string | undefined {
  return Cookies.get(key)
}

export function setValueToCookie(
  key: string,
  value: string,
  options: { path?: string; maxAge?: number } = {},
): void {
  Cookies.set(key, value, {
    path: options.path ?? '/',
    expires: options.maxAge ? options.maxAge / 86400 : 7, // 7 ngày như bản gốc
  })
}

export function getPreference<T extends string>(
  key: string,
  allowed: ReadonlyArray<T>,
  fallback: T,
): T {
  const raw = Cookies.get(key)
  const value = raw ? raw.trim() : undefined
  return allowed.includes(value as T) ? (value as T) : fallback
}
