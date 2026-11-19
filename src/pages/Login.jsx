import { useState } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Sparkles, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { MOCK_ADMIN_USERS } from '../mock/adminUsers'
import { APP_NAME } from '../config/brand'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from && location.state.from !== '/login' ? location.state.from : '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 280))
    const result = login(username, password)
    setLoading(false)
    if (result.ok) {
      navigate(from, { replace: true })
    } else {
      setError(result.error ?? 'No se pudo iniciar sesión.')
    }
  }

  return (
    <div className="login-aurora relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl app-shell-glow" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-amber-200/35 blur-3xl"
        animate={{ y: [0, 28, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-orange-600/30 blur-3xl"
        animate={{ x: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="w-full max-w-md rounded-xl border border-white/30 bg-white/95 p-8 shadow-2xl shadow-orange-950/25 ring-1 ring-white/50 backdrop-blur-sm"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.5 }}
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C00] to-orange-700 text-white shadow-lg shadow-orange-900/30"
            >
              <Sparkles className="h-7 w-7" strokeWidth={1.75} />
            </motion.div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">{APP_NAME}</h1>
            <p className="mt-1 text-sm text-neutral-500">Acceso exclusivo para administradores</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.25 }}
            >
              <label htmlFor="login-user" className="mb-1 block text-xs font-semibold uppercase text-neutral-600">
                Usuario
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="login-user"
                  autoComplete="username"
                  className="pl-8"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.25 }}
            >
              <label htmlFor="login-pass" className="mb-1 block text-xs font-semibold uppercase text-neutral-600">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="login-pass"
                  type="password"
                  autoComplete="current-password"
                  className="pl-8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {error ? (
                <motion.p
                  key={error}
                  role="alert"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                >
                  {error}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <Button type="submit" className="w-full py-2.5 text-base font-semibold" disabled={loading}>
                {loading ? 'Verificando…' : 'Ingresar'}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
            <p className="font-semibold text-amber-900">Cuentas demo (mock)</p>
            <ul className="mt-2 space-y-2">
              {MOCK_ADMIN_USERS.map((u) => (
                <li
                  key={u.username}
                  className="flex flex-wrap items-center justify-between gap-2 rounded border border-amber-100 bg-white/60 px-2 py-1.5 font-mono text-[11px] text-neutral-800"
                >
                  <span>
                    <span className="font-semibold">{u.username}</span> / {u.password}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 border-amber-300 !px-2 !py-1 text-[10px] font-semibold text-amber-950 hover:bg-amber-100"
                    onClick={() => {
                      setError('')
                      setUsername(u.username)
                      setPassword(u.password)
                    }}
                  >
                    Autocompletar
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs text-white/90 drop-shadow-sm">
          Panel interno · sesión en este navegador (sessionStorage)
        </p>
      </div>
    </div>
  )
}
