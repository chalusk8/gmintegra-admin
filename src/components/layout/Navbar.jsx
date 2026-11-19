import { Bell, Menu, Star, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

const iconBtn =
  'rounded-lg p-2 text-neutral-700 transition-colors hover:bg-orange-50/80 hover:text-[#ea580c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8C00]'

export function Navbar({ title, subtitle, onOpenMobile }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/90 bg-white/85 shadow-sm shadow-orange-950/5 backdrop-blur-md backdrop-saturate-150">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-6">
        <motion.button
          type="button"
          onClick={onOpenMobile}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex rounded-lg border border-neutral-300 bg-white/90 p-2 text-neutral-700 shadow-sm lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </motion.button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold uppercase tracking-tight text-neutral-900 sm:text-lg">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-xs text-neutral-500 sm:text-sm">{subtitle}</p>
          ) : null}
          {user?.displayName ? (
            <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-wide text-[#FF8C00]">
              Admin: {user.displayName}
            </p>
          ) : null}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          <motion.button
            type="button"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={iconBtn}
            aria-label="Favoritos"
          >
            <Star className="h-5 w-5" strokeWidth={1.5} />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={iconBtn}
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" strokeWidth={1.5} />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={iconBtn}
            aria-label="Perfil"
            title={user?.username ?? 'Administrador'}
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </motion.button>
          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={iconBtn}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
    </header>
  )
}
