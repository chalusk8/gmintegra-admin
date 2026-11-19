import { Filter, Search } from 'lucide-react'
import { Input } from '../ui/Input'

const membershipOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Activas' },
  { value: 'inactive', label: 'Inactivas' },
  { value: 'expired', label: 'Vencidas' },
  { value: 'pending', label: 'Pendientes' },
]

const usageOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'En uso' },
  { value: 'idle', label: 'Inactivo' },
]

const selectClass =
  'rounded-md border border-neutral-300 bg-white py-1.5 pl-2 pr-8 text-sm text-neutral-800 focus:border-[#FF8C00] focus:outline-none focus:ring-1 focus:ring-[#FF8C00]/30'

export function ClientsToolbar({
  query,
  onQueryChange,
  membershipFilter,
  onMembershipChange,
  usageFilter,
  onUsageChange,
  resultCount,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          className="pl-8"
          placeholder="Buscar por nombre, empresa, email, RFC o servicio…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 text-neutral-600">
          <Filter className="h-4 w-4 shrink-0" />
          <select
            className={selectClass}
            value={membershipFilter}
            onChange={(e) => onMembershipChange(e.target.value)}
          >
            {membershipOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <select className={selectClass} value={usageFilter} onChange={(e) => onUsageChange(e.target.value)}>
          {usageOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <p className="text-xs text-neutral-600">
          <span className="font-bold text-neutral-900">{resultCount}</span> registros
        </p>
      </div>
    </div>
  )
}
