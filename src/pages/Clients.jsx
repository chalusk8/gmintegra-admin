import { MainLayout } from '../layouts/MainLayout'
import { ClientsTable } from '../components/clients/ClientsTable'
import { ClientsToolbar } from '../components/clients/ClientsToolbar'
import { useClients } from '../hooks/useClients'

export default function Clients() {
  const {
    clients: rows,
    query,
    setQuery,
    membershipFilter,
    setMembershipFilter,
    usageFilter,
    setUsageFilter,
  } = useClients()

  return (
    <MainLayout
      fullscreen
      title="Clientes"
      subtitle="Directorio de cuentas con integraciones logísticas y estado de membresía."
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 bg-[#FF8C00] px-4 py-2.5 text-sm font-semibold text-white sm:px-6 lg:px-8">
          Listado de clientes
        </div>
        <div className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <ClientsToolbar
            query={query}
            onQueryChange={setQuery}
            membershipFilter={membershipFilter}
            onMembershipChange={setMembershipFilter}
            usageFilter={usageFilter}
            onUsageChange={setUsageFilter}
            resultCount={rows.length}
          />
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-white">
          <ClientsTable clients={rows} edgeToEdge />
        </div>
      </div>
    </MainLayout>
  )
}
