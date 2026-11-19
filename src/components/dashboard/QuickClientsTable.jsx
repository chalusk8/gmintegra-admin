import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { relativeTime } from '../../utils/formatDate'

export function QuickClientsTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-100">
            <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800">
              Cliente
            </th>
            <th className="hidden px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800 md:table-cell">
              Membresía
            </th>
            <th className="hidden px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800 lg:table-cell">
              Uso
            </th>
            <th className="px-3 py-2 text-right text-xs font-bold uppercase tracking-wide text-neutral-800">
              Actividad
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c, idx) => (
            <motion.tr
              key={c.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.02 }}
              className={`border-b border-neutral-200 ${idx % 2 === 1 ? 'bg-neutral-50/90' : 'bg-white'} hover:bg-orange-50/60`}
            >
              <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <Avatar name={c.name} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-neutral-900">{c.company}</p>
                    <p className="truncate text-xs text-neutral-500">{c.name}</p>
                  </div>
                </div>
              </td>
              <td className="hidden px-3 py-2 md:table-cell">
                <Badge variant={c.membershipStatus === 'active' ? 'active' : c.membershipStatus}>
                  {c.membershipStatus}
                </Badge>
              </td>
              <td className="hidden px-3 py-2 lg:table-cell">
                <Badge variant={c.usageStatus === 'active' ? 'active' : 'inactive'}>
                  {c.usageStatus === 'active' ? 'En uso' : 'Inactivo'}
                </Badge>
              </td>
              <td className="px-3 py-2 text-right">
                <div className="group/row inline-flex items-center gap-2">
                  <span className="text-xs text-neutral-600">{relativeTime(c.lastActivity)}</span>
                  <Link
                    to={`/clients/${c.id}`}
                    className="inline-flex rounded p-1 text-neutral-400 opacity-0 transition group-hover/row:opacity-100 hover:bg-white hover:text-[#FF8C00]"
                    aria-label={`Ver ${c.company}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
