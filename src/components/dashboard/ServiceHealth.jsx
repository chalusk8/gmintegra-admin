import { motion } from 'framer-motion'

export function ServiceHealth({ rows }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {rows.map((row, idx) => {
        const ratio = row.total ? row.active / row.total : 0
        return (
          <motion.div
            key={row.platform}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="rounded-md border border-neutral-200 bg-white p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-neutral-900">{row.platform}</p>
              <span className="text-xs text-neutral-500">
                {row.active}/{row.total}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-sm bg-neutral-100">
              <motion.div
                className="h-full rounded-sm bg-[#FF8C00]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(ratio * 100)}%` }}
                transition={{ delay: 0.08 + idx * 0.04, duration: 0.45 }}
              />
            </div>
            {row.issues ? (
              <p className="mt-1.5 text-[11px] font-medium text-amber-700">{row.issues} requieren atención</p>
            ) : (
              <p className="mt-1.5 text-[11px] font-medium text-emerald-700">Estable</p>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
