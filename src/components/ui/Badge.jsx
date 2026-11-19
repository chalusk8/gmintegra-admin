/* Badges estilo ERP: fondo sólido, texto blanco, sin sombras */
const styles = {
  active: 'bg-emerald-600 text-white',
  inactive: 'bg-neutral-500 text-white',
  expired: 'bg-red-600 text-white',
  pending: 'bg-sky-600 text-white',
  success: 'bg-emerald-600 text-white',
  info: 'bg-sky-600 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-600 text-white',
}

export function Badge({ children, variant = 'inactive', className = '' }) {
  const base = 'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold'
  return <span className={`${base} ${styles[variant] ?? styles.inactive} ${className}`}>{children}</span>
}
