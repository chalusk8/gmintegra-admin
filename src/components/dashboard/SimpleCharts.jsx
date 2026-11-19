import { motion } from 'framer-motion'

export function SimpleCharts() {
  const bars = [
    { label: 'Lun', value: 42 },
    { label: 'Mar', value: 58 },
    { label: 'Mié', value: 36 },
    { label: 'Jue', value: 64 },
    { label: 'Vie', value: 48 },
    { label: 'Sáb', value: 22 },
    { label: 'Dom', value: 18 },
  ]
  const max = Math.max(...bars.map((b) => b.value))

  return (
    <div className="rounded-md border border-neutral-200 bg-white p-4">
      <div className="mb-3 border-b border-neutral-100 pb-2">
        <p className="text-sm font-bold text-[#FF8C00]">Actividad simulada</p>
        <p className="text-xs text-neutral-500">Eventos por día (mock)</p>
      </div>
      <div className="flex h-36 items-end gap-1.5">
        {bars.map((b, i) => {
          const h = Math.max(8, Math.round((b.value / max) * 110))
          return (
            <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <motion.div
                className="w-full max-w-[28px] rounded-sm bg-[#FF8C00]"
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ delay: 0.04 * i, type: 'spring', stiffness: 160, damping: 18 }}
              />
              <span className="text-[10px] font-medium text-neutral-500">{b.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
