export function Avatar({ name, className = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-orange-700 to-orange-900 text-xs font-bold text-white ${className}`}
      aria-hidden
    >
      {initials || '?'}
    </div>
  )
}
