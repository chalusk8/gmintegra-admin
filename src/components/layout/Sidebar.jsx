import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { APP_NAME, APP_TAGLINE } from '../../config/brand'

const linkBase =
  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out'

function NavItem({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${linkBase} ${
          isActive
            ? 'bg-white font-semibold text-orange-600 shadow-md shadow-orange-900/10 ring-1 ring-white/40'
            : 'text-white/95 hover:bg-white/12 hover:shadow-sm active:scale-[0.99]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
              isActive ? 'scale-110 text-orange-600' : 'text-white/85 group-hover:scale-110 group-hover:text-white'
            }`}
            strokeWidth={1.75}
          />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

export function Sidebar() {
  return (
    <aside className="relative hidden w-64 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#FF8C00] via-[#ea580c] to-[#c2410c] px-3 py-5 text-white shadow-xl shadow-orange-950/20 lg:flex">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />

      <div className="relative z-[1] mb-6 flex items-center gap-2 border-b border-white/20 px-1 pb-5">
        <motion.div
          whileHover={{ scale: 1.06, rotate: [0, -4, 4, 0] }}
          transition={{ duration: 0.45 }}
          className="flex h-10 w-10 cursor-default items-center justify-center rounded-lg bg-white text-orange-600 shadow-md shadow-orange-900/20"
        >
          <Sparkles className="h-5 w-5" strokeWidth={1.75} />
        </motion.div>
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-wide text-white drop-shadow-sm">{APP_NAME}</p>
          <p className="text-[11px] text-white/85">{APP_TAGLINE}</p>
        </div>
      </div>

      <nav className="relative z-[1] flex flex-1 flex-col gap-1">
        <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-white/65">Menú</p>
        <NavItem to="/" end icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/clients" icon={Users} label="Clientes" />
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative z-[1] mt-auto rounded-lg border border-white/25 bg-white/10 p-3 text-[11px] leading-relaxed text-white/95 shadow-inner backdrop-blur-[2px]"
      >
        <p className="font-semibold text-white">Modo demo</p>
        <p className="mt-1 text-white/80">Datos mock; sustituye por API real.</p>
      </motion.div>
    </aside>
  )
}
