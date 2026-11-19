import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { findAdminUser } from '../mock/adminUsers'
import { SESSION_STORAGE_KEY } from '../config/brand'

const SESSION_KEY = SESSION_STORAGE_KEY

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data?.username) return null
    return data
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())

  const login = useCallback((username, password) => {
    const trimmed = username.trim()
    if (!trimmed || !password) {
      return { ok: false, error: 'Ingresa usuario y contraseña.' }
    }
    const found = findAdminUser(trimmed, password)
    if (!found) {
      return { ok: false, error: 'Usuario o contraseña incorrectos.' }
    }
    const session = {
      username: found.username,
      displayName: found.displayName,
      role: 'admin',
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return ctx
}
