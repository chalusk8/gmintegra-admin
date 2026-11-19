import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../components/ui/Button'
import { ClientUsersTable } from '../components/clients/ClientUsersTable'
import { getClientById } from '../mock/clients'
import { getUsersForClient } from '../mock/clientUsers'
import { APP_NAME } from '../config/brand'

export default function ClientUsers() {
  const { clientId } = useParams()
  const client = getClientById(clientId)
  const users = client ? getUsersForClient(client) : []

  if (!client) {
    return (
      <MainLayout title="Empresa no encontrada" subtitle="No hay datos para este identificador.">
        <div className="mx-auto max-w-lg rounded-md border border-neutral-200 bg-white p-8 text-center">
          <p className="text-sm text-neutral-600">Vuelve al listado de clientes.</p>
          <Link to="/clients" className="mt-4 inline-block">
            <Button>Ir a clientes</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout
      title={`${client.company} · Usuarios`}
      subtitle={`Personal de esta empresa con acceso al portal ${APP_NAME} y credenciales únicamente en los servicios habilitados para cada usuario (mock).`}
    >
      <div className="mx-auto max-w-[100vw] space-y-4 px-0 sm:px-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to={`/clients/${client.id}`}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a la empresa
            </Button>
          </Link>
        </div>

        <ClientUsersTable client={client} users={users} />
      </div>
    </MainLayout>
  )
}
