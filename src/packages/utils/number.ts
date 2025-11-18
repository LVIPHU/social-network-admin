export function formatCurrency(
  amount: number,
  opts?: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    noDecimals?: boolean
  },
) {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
    noDecimals,
  } = opts ?? {}

  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
    maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits,
  }

  return new Intl.NumberFormat(locale, formatOptions).format(amount)
}

export function formatNumber(
  value?: string | number,
  opts?: {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    noDecimals?: boolean
  },
): string {
  if (typeof value !== 'string' && typeof value !== 'number') return '0'
  const num = Number(value)

  if (Number.isNaN(num)) {
    throw new Error(`Invalid number: ${value}`)
  }

  const {
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
    noDecimals,
  } = opts ?? {}

  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
    maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits,
  }

  return new Intl.NumberFormat(locale, formatOptions).format(num)
}
