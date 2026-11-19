import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Mail, Phone, UserCircle2 } from 'lucide-react'
import { MainLayout } from '../layouts/MainLayout'
import { Card, CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { getClientById } from '../mock/clients'
import { formatDateLong, relativeTime } from '../utils/formatDate'
import { APP_NAME } from '../config/brand'

const logVariant = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

export default function ClientDetail() {
  const { clientId } = useParams()
  const client = getClientById(clientId)

  if (!client) {
    return (
      <MainLayout title="Cliente no encontrado" subtitle="El identificador no coincide con registros mock.">
        <div className="mx-auto max-w-lg rounded-md border border-neutral-200 bg-white p-8 text-center">
          <p className="text-sm text-neutral-600">Vuelve al listado y selecciona un cliente válido.</p>
          <Link to="/clients" className="mt-4 inline-block">
            <Button>Ir a clientes</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  const pushes = client.integrations.filter((i) => i.direction === 'push')
  const pulls = client.integrations.filter((i) => i.direction === 'pull')

  return (
    <MainLayout
      title={client.company}
      subtitle="Cuenta empresarial: membresía, integraciones y actividad."
    >
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/clients">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
          <Badge variant={client.membershipStatus}>{client.membershipStatus}</Badge>
          <Badge variant={client.usageStatus === 'active' ? 'active' : 'inactive'}>
            {client.usageStatus === 'active' ? 'Uso activo' : 'Sin uso reciente'}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2" hover={false}>
            <CardHeader
              title="Datos de la empresa"
              subtitle="Razón social, RFC y contacto de la cuenta."
            />
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Razón social</dt>
                <dd className="mt-1 text-lg font-bold text-neutral-900">{client.company}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">RFC</dt>
                <dd className="mt-1 font-mono text-sm font-semibold uppercase tracking-wide text-neutral-900">
                  {client.rfc ?? '—'}
                </dd>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Correo de la empresa
                  </dt>
                  <dd className="mt-0.5 font-medium text-neutral-800">{client.email}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Teléfono de la empresa
                  </dt>
                  <dd className="mt-0.5 font-medium text-neutral-800">{client.phone}</dd>
                </div>
              </div>
            </dl>
          </Card>

          <Card hover={false}>
            <CardHeader title="Membresía" subtitle="Fechas clave del ciclo comercial." />
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Contratación</dt>
                <dd className="font-semibold text-neutral-900">{formatDateLong(client.createdAt)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Vencimiento</dt>
                <dd className="font-semibold text-neutral-900">{formatDateLong(client.membershipExpiration)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-neutral-500">Última actividad</dt>
                <dd className="font-semibold text-neutral-900">{relativeTime(client.lastActivity)}</dd>
              </div>
            </dl>
          </Card>
        </div>

        <Card hover={false}>
          <CardHeader
            title="Usuarios de la empresa"
            subtitle={`Colaboradores con acceso al portal ${APP_NAME} y credenciales técnicas solo en los servicios habilitados para cada persona. Datos simulados.`}
            action={
              <Link to={`/clients/${client.id}/usuarios`}>
                <Button className="gap-2">
                  <UserCircle2 className="h-4 w-4" />
                  Ver usuarios
                </Button>
              </Link>
            }
          />
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card hover={false}>
            <CardHeader title="Servicios contratados" subtitle="Catálogo habilitado para la cuenta." />
            <div className="flex flex-wrap gap-2">
              {client.services.map((s) => (
                <span
                  key={s}
                  className="rounded border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <CardHeader title="Push / Pull" subtitle="Direcciones de flujo actuales." />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-orange-200 bg-orange-50/80 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-orange-900">
                  <ArrowUpRight className="h-4 w-4" />
                  Push
                </div>
                <ul className="mt-2 space-y-1 text-sm text-neutral-800">
                  {pushes.length ? pushes.map((p) => <li key={p.id}>{p.label}</li>) : <li className="text-neutral-500">—</li>}
                </ul>
              </div>
              <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-700">
                  <ArrowDownLeft className="h-4 w-4" />
                  Pull
                </div>
                <ul className="mt-2 space-y-1 text-sm text-neutral-800">
                  {pulls.length ? pulls.map((p) => <li key={p.id}>{p.label}</li>) : <li className="text-neutral-500">—</li>}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card hover={false}>
          <CardHeader title="Integraciones activas" subtitle="Estado por conexión con plataforma externa." />
          <div className="grid gap-3 md:grid-cols-2">
            {client.integrations.map((int) => (
              <div
                key={int.id}
                className="flex items-center justify-between gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{int.label}</p>
                  <p className="text-xs text-neutral-500">
                    {int.platform} · {int.direction === 'push' ? 'Push' : 'Pull'}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={int.status}>{int.status}</Badge>
                  <p className="mt-1 text-[11px] text-neutral-500">{relativeTime(int.lastSyncAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <CardHeader title="Historial de integraciones" subtitle="Logs simulados listos para sustituir por streaming." />
          <div className="space-y-2">
            {[...client.integrationLogs]
              .sort((a, b) => new Date(b.at) - new Date(a.at))
              .map((log) => (
                <div
                  key={log.id}
                  className="flex flex-wrap items-start justify-between gap-3 border border-neutral-200 bg-white px-3 py-2"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={logVariant[log.level] ?? 'info'}>{log.level}</Badge>
                    <p className="text-sm text-neutral-800">{log.message}</p>
                  </div>
                  <p className="text-xs text-neutral-500">{formatDateLong(log.at)}</p>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}
