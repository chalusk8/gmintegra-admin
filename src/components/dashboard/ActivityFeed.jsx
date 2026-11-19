import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { formatDateLong } from '../../utils/formatDate'

const levelVariant = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

export function ActivityFeed({ items }) {
  return (
    <div className="space-y-2">
      {items.map((row, idx) => (
        <motion.div
          key={row.id}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.03 }}
          className="flex flex-wrap items-start justify-between gap-2 border border-neutral-200 bg-neutral-50/80 px-3 py-2"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={levelVariant[row.level] ?? 'info'}>{row.level}</Badge>
              <Link
                to={`/clients/${row.clientId}`}
                className="truncate text-xs font-semibold text-[#FF8C00] hover:underline"
              >
                {row.clientName}
              </Link>
            </div>
            <p className="mt-1 text-sm text-neutral-800">{row.message}</p>
          </div>
          <p className="shrink-0 text-xs text-neutral-500">{formatDateLong(row.at)}</p>
        </motion.div>
      ))}
    </div>
  )
}
