import { Activity, ArrowDownLeft, ArrowUpRight, Plug2, ShieldCheck, Users } from 'lucide-react'
import { MainLayout } from '../layouts/MainLayout'
import { StatCard } from '../components/dashboard/StatCard'
import { ActivityFeed } from '../components/dashboard/ActivityFeed'
import { QuickClientsTable } from '../components/dashboard/QuickClientsTable'
import { SimpleCharts } from '../components/dashboard/SimpleCharts'
import { ServiceHealth } from '../components/dashboard/ServiceHealth'
import { Card, CardHeader } from '../components/ui/Card'
import { clients, getDashboardStats, getRecentActivity } from '../mock/clients'
import { serviceHealthSummary } from '../utils/stats'

export default function Dashboard() {
  const stats = getDashboardStats()
  const activity = getRecentActivity(8)
  const health = serviceHealthSummary()
  const quickClients = [...clients].sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)).slice(0, 6)

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Visibilidad operativa de clientes, membresías e integraciones."
    >
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Clientes activos"
            value={stats.activeClients}
            hint="Con servicios contratados y membresía activa"
            icon={Users}
            delay={0}
          />
          <StatCard
            label="Membresías vigentes"
            value={stats.validMemberships}
            hint="Activas o pendientes sin vencer"
            icon={ShieldCheck}
            delay={0.04}
          />
          <StatCard
            label="Membresías vencidas"
            value={stats.expiredMemberships}
            hint="Requieren renovación o follow-up"
            icon={Activity}
            delay={0.08}
          />
          <StatCard
            label="Integraciones activas"
            value={stats.activeIntegrations}
            hint="Conexiones con tráfico habilitado"
            icon={Plug2}
            delay={0.12}
          />
          <StatCard
            label="Push connections"
            value={stats.pushConnections}
            hint="Flujos salientes hacia plataformas"
            icon={ArrowUpRight}
            delay={0.16}
          />
          <StatCard
            label="Pull connections"
            value={stats.pullConnections}
            hint="Ingesta desde APIs externas"
            icon={ArrowDownLeft}
            delay={0.2}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2" hover={false}>
            <CardHeader title="Actividad reciente" subtitle="Eventos simulados de integraciones y sincronización." />
            <ActivityFeed items={activity} />
          </Card>

          <div className="space-y-6">
            <SimpleCharts />
            <Card hover={false}>
              <CardHeader title="Estado de plataformas" subtitle="Resumen de salud por proveedor." />
              <ServiceHealth rows={health} />
            </Card>
          </div>
        </div>

        <Card hover={false}>
          <CardHeader
            title="Clientes en foco"
            subtitle="Ordenados por última actividad — acceso rápido al detalle."
          />
          <QuickClientsTable rows={quickClients} />
        </Card>
      </div>
    </MainLayout>
  )
}
