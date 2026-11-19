import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, X } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { Navbar } from '../components/layout/Navbar'

const mobileLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/clients', label: 'Clientes', icon: Users },
]

export function MainLayout({ title, subtitle, children, fullscreen = false }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div
      className={`flex ${fullscreen ? 'h-screen min-h-0 overflow-hidden bg-white' : 'min-h-screen bg-neutral-50/80'}`}
    >
      <Sidebar />

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px]"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute left-0 top-0 flex h-full w-72 flex-col bg-gradient-to-b from-[#FF8C00] via-[#ea580c] to-[#c2410c] p-4 text-white shadow-2xl shadow-orange-950/30"
            >
              <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-3">
                <p className="text-sm font-bold uppercase tracking-wide">Menú</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-white transition-colors hover:bg-white/15 active:scale-95"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-0.5">
                {mobileLinks.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white font-semibold text-orange-600 shadow-md shadow-orange-900/10'
                          : 'text-white/95 hover:bg-white/10 active:scale-[0.99]'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={`relative flex min-w-0 flex-1 flex-col overflow-hidden bg-white ${fullscreen ? 'min-h-0' : ''}`}>
        {!fullscreen ? (
          <>
            <div className="app-shell-glow pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-orange-200/50 blur-3xl" />
            <div className="app-shell-glow pointer-events-none absolute bottom-[-120px] left-1/4 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl [animation-delay:-4s]" />
          </>
        ) : null}
        <div className="relative z-[1] flex min-h-0 min-w-0 flex-1 flex-col">
          <Navbar title={title} subtitle={subtitle} onOpenMobile={() => setMobileOpen(true)} />
          <main
            className={
              fullscreen
                ? 'flex min-h-0 flex-1 flex-col px-0 py-0'
                : 'flex-1 px-4 py-5 sm:px-6 lg:px-6 lg:py-6'
            }
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
