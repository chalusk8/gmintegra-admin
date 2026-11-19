import { Fragment } from 'react'
import { Users } from 'lucide-react'

function Cell({ children, mono, sticky, className = '' }) {
  return (
    <td
      className={`border-b border-neutral-200 px-2 py-2 align-top text-xs text-neutral-800 ${
        mono ? 'font-mono text-[11px] font-medium' : ''
      } ${sticky ? `sticky left-0 z-[1] border-r border-neutral-200 ${className}` : className}`}
    >
      {children}
    </td>
  )
}

export function ClientUsersTable({ client, users }) {
  const services = client.services

  return (
    <div className="overflow-x-auto border border-neutral-200 bg-white">
      <p className="border-b border-neutral-200 bg-neutral-50 px-3 py-2 text-[11px] text-neutral-600">
        Filas = usuarios de la <span className="font-semibold text-neutral-800">{client.company}</span>. Cada servicio
        solo muestra credenciales si ese usuario lo tiene <span className="font-semibold">habilitado</span>; si no,
        aparece “—”.
      </p>
      <table className="min-w-max w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-100">
            <th
              rowSpan={2}
              className="sticky left-0 z-[2] border-r border-neutral-200 bg-neutral-100 px-2 py-2 align-bottom text-xs font-bold uppercase tracking-wide text-neutral-800"
            >
              Usuario
            </th>
            <th
              rowSpan={2}
              className="whitespace-nowrap border-r border-neutral-100 px-2 py-2 align-bottom text-xs font-bold uppercase tracking-wide text-neutral-800"
            >
              Login portal
            </th>
            <th
              rowSpan={2}
              className="whitespace-nowrap border-r border-neutral-200 px-2 py-2 align-bottom text-xs font-bold uppercase tracking-wide text-neutral-800"
            >
              Contraseña portal
            </th>
            {services.map((svc) => (
              <th
                key={svc}
                colSpan={2}
                className="border-l border-neutral-300 bg-orange-50/90 px-2 py-2 text-center text-xs font-bold uppercase leading-tight tracking-wide text-orange-900"
              >
                <div className="flex items-center justify-center gap-1">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{svc}</span>
                </div>
              </th>
            ))}
          </tr>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            {services.map((svc) => (
              <Fragment key={`${svc}-sub`}>
                <th className="border-l border-neutral-200 px-2 py-1.5 text-[10px] font-semibold uppercase text-neutral-600">
                  Usuario
                </th>
                <th className="border-l border-neutral-100 px-2 py-1.5 text-[10px] font-semibold uppercase text-neutral-600">
                  Contraseña
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.id} className={idx % 2 === 1 ? 'bg-neutral-50/90' : 'bg-white'}>
              <Cell sticky className={idx % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}>
                {u.displayName}
              </Cell>
              <Cell mono>{u.portalLogin}</Cell>
              <Cell mono>{u.portalPassword}</Cell>
              {services.map((svc) => {
                const cred = u.byService[svc]
                if (!cred) {
                  return (
                    <Fragment key={`${u.id}-${svc}`}>
                      <Cell mono className="bg-neutral-50/80 text-neutral-400">
                        —
                      </Cell>
                      <Cell mono className="bg-neutral-50/80 text-neutral-400">
                        —
                      </Cell>
                    </Fragment>
                  )
                }
                return (
                  <Fragment key={`${u.id}-${svc}`}>
                    <Cell mono>{cred.username}</Cell>
                    <Cell mono>{cred.password}</Cell>
                  </Fragment>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
