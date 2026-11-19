import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Clients from '../pages/Clients'
import ClientUsers from '../pages/ClientUsers'
import ClientUserDetail from '../pages/ClientUserDetail'
import ClientDetail from '../pages/ClientDetail'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export function AppRoutes() {
  return (
    <BrowserRouter basename={routerBasename}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:clientId/usuario/:userId" element={<ClientUserDetail />} />
            <Route path="/clients/:clientId/usuarios" element={<ClientUsers />} />
            <Route path="/clients/:clientId" element={<ClientDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
