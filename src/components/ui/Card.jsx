import { motion } from 'framer-motion'

export function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? {
              y: -3,
              boxShadow: '0 18px 40px -12px rgba(15, 23, 42, 0.12)',
            }
          : undefined
      }
      className={`rounded-lg border border-neutral-200/90 bg-white/95 p-4 shadow-sm shadow-neutral-900/5 backdrop-blur-sm transition-shadow duration-300 hover:border-orange-200/80 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="mb-3 flex flex-wrap items-start justify-between gap-3 border-b border-neutral-100 pb-3">
      <div>
        <h3 className="bg-gradient-to-r from-[#ea580c] to-[#FF8C00] bg-clip-text text-sm font-bold text-transparent">
          {title}
        </h3>
        {subtitle ? <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  )
}
