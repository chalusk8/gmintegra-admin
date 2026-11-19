import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  UserCircle2,
  Wallet,
} from 'lucide-react'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { getClientById } from '../mock/clients'
import { getClientUserById } from '../mock/clientUsers'
import { formatDateLong, formatDateShort, formatMoney } from '../utils/formatDate'
import { APP_NAME } from '../config/brand'

function SummaryRow({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-2.5 last:border-0">
      <span className="shrink-0 text-sm text-neutral-500">{label}</span>
      <span
        className={`text-right text-sm font-semibold text-neutral-900 ${mono ? 'break-all font-mono text-xs' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}

function userInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export default function ClientUserDetail() {
  const { clientId, userId } = useParams()
  const client = getClientById(clientId)
  const user = client && userId ? getClientUserById(client, userId) : null

  if (!client || !user) {
    return (
      <MainLayout title="Usuario no encontrado" subtitle="El enlace no coincide con datos mock.">
        <div className="mx-auto max-w-lg rounded-md border border-neutral-200 bg-white p-8 text-center">
          <p className="text-sm text-neutral-600">Vuelve al listado de clientes o elige otro usuario.</p>
          <Link to="/clients" className="mt-4 inline-block">
            <Button>Ir a clientes</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  const serviceCount = user.enabledServices?.length ?? 0

  return (
    <MainLayout title={user.displayName} subtitle={`${client.company} · ficha de usuario`}>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <Link to="/clients">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Clientes
            </Button>
          </Link>
          <Link to={`/clients/${client.id}`}>
            <Button variant="outline" className="gap-2">
              <Building2 className="h-4 w-4" />
              Empresa
            </Button>
          </Link>
          <Link to={`/clients/${client.id}/usuarios`}>
            <Button variant="outline" className="gap-2">
              <UserCircle2 className="h-4 w-4" />
              Usuarios
            </Button>
          </Link>
        </div>

        {/* Resumen */}
        <div className="overflow-hidden rounded-lg border border-orange-200/80 bg-gradient-to-br from-orange-50 via-white to-amber-50/40 shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C00] to-orange-700 text-lg font-bold text-white shadow-md shadow-orange-900/20"
                aria-hidden
              >
                {userInitials(user.displayName)}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-neutral-900">{user.displayName}</h2>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-neutral-600">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                  <span className="truncate font-mono text-xs">{user.email}</span>
                </div>
                <Link
                  to={`/clients/${client.id}`}
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#ea580c] hover:underline"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  {client.company}
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-orange-200 bg-white/90 px-2.5 py-1 text-xs font-semibold text-orange-950">
                <Calendar className="h-3.5 w-3.5 text-[#FF8C00]" />
                Ingreso {formatDateShort(user.joinedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {serviceCount} servicio{serviceCount === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cuenta empresarial */}
          <Card hover={false}>
            <CardHeader title="Cuenta empresarial" subtitle="Empresa a la que pertenece este usuario." />
            <div className="space-y-0">
              <SummaryRow label="Razón social" value={client.company} />
              <SummaryRow label="RFC" value={client.rfc ?? '—'} mono />
            </div>
          </Card>

          {/* Plan comercial */}
          <Card hover={false}>
            <CardHeader title="Plan y facturación" subtitle="Alta al servicio y costo mensual (mock)." />
            <div className="rounded-md border border-orange-100 bg-orange-50/50 p-4">
              <div className="flex items-start gap-3">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-[#FF8C00]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Costo mensual</p>
                  <p className="mt-0.5 text-2xl font-bold tabular-nums text-[#ea580c]">
                    {formatMoney(user.monthlyCost)}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-neutral-600">
                    Incluye licencia de usuario y servicios habilitados.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-0">
              <SummaryRow label="Fecha de ingreso" value={formatDateLong(user.joinedAt)} />
            </div>
          </Card>
        </div>

        {/* Acceso portal */}
        <Card hover={false}>
          <CardHeader
            title={`Acceso al portal ${APP_NAME}`}
            subtitle="Credenciales de inicio de sesión para este usuario."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-600">
                <KeyRound className="h-4 w-4 text-[#FF8C00]" />
                Usuario
              </div>
              <p className="break-all font-mono text-sm font-semibold text-neutral-900">{user.portalLogin}</p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-600">
                <Lock className="h-4 w-4 text-[#FF8C00]" />
                Contraseña
              </div>
              <p className="break-all font-mono text-sm font-semibold text-neutral-900">{user.portalPassword}</p>
            </div>
          </div>
        </Card>

        {/* Servicios */}
        <Card hover={false}>
          <CardHeader
            title="Servicios habilitados"
            subtitle="Integraciones contratadas a las que tiene acceso este usuario."
          />
          {user.enabledServices?.length ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {user.enabledServices.map((svc) => (
                <li
                  key={svc}
                  className="flex items-center gap-2 rounded-md border border-orange-100 bg-orange-50/60 px-3 py-2.5 text-sm font-medium text-neutral-800"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  {svc}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">Sin servicios habilitados en el mock.</p>
          )}
        </Card>

        <p className="text-center text-xs text-neutral-500">
          Datos simulados para maquetación. En producción no exponer contraseñas en claro.
        </p>
      </div>
    </MainLayout>
  )
}
