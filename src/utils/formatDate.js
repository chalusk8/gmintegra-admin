const shortFmt = new Intl.DateTimeFormat('es', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const longFmt = new Intl.DateTimeFormat('es', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDateShort(iso) {
  if (!iso) return '—'
  return shortFmt.format(new Date(iso))
}

export function formatDateLong(iso) {
  if (!iso) return '—'
  return longFmt.format(new Date(iso))
}

const moneyFmt = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export function formatMoney(amount) {
  if (amount == null || Number.isNaN(Number(amount))) return '—'
  return moneyFmt.format(Number(amount))
}

export function relativeTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  const diffMs = Date.now() - d.getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'hace instantes'
  if (mins < 60) return `hace ${mins} min`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.round(hours / 24)
  if (days < 7) return `hace ${days} d`
  return formatDateShort(iso)
}
