import { motion } from 'framer-motion'

export function StatCard({ label, value, hint, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.2 }}
      whileHover={{ y: -1 }}
      className="rounded-md border border-neutral-200 bg-white p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-neutral-900">{value}</p>
          {hint ? <p className="mt-1 text-[11px] text-neutral-500">{hint}</p> : null}
        </div>
        <motion.div
          whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.35 }}
          className="rounded border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50/80 p-2 text-[#FF8C00] shadow-sm shadow-orange-900/5"
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </motion.div>
      </div>
    </motion.div>
  )
}
