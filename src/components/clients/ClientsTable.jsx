import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { formatDateShort } from '../../utils/formatDate'
import { CompanyUsersLoginCascade } from './CompanyUsersLoginCascade'
import { ServiceUserEmailsCascade } from './ServiceUserEmailsCascade'

export function ClientsTable({ clients: rows, edgeToEdge = false }) {
  const shell = edgeToEdge
    ? 'rounded-none border-x-0 border-b-0 border-t border-neutral-200 bg-white'
    : 'rounded-md border border-neutral-200 bg-white'

  return (
    <div className={`${shell} overflow-visible`}>
      <div className="overflow-x-auto overflow-y-visible">
        <table className="min-w-0 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-100">
              <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800">
                Empresa
              </th>
              <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800">
                RFC
              </th>
              <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800">
                Servicios
              </th>
              <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800">
                Uso
              </th>
              <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-neutral-800">
                Ingreso
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, idx) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(idx * 0.015, 0.2) }}
                className={`border-b border-neutral-200 ${idx % 2 === 1 ? 'bg-neutral-50/90' : 'bg-white'} hover:bg-orange-50/60`}
              >
                <td className="px-3 py-2">
                  <CompanyUsersLoginCascade client={c}>
                    <Link
                      to={`/clients/${c.id}`}
                      className="font-semibold text-[#FF8C00] underline-offset-2 hover:underline"
                    >
                      {c.company}
                    </Link>
                  </CompanyUsersLoginCascade>
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-neutral-800">
                  {c.rfc ?? '—'}
                </td>
                <td className="px-3 py-2">
                  <div className="flex max-w-md flex-wrap gap-1">
                    {c.services.map((s) => (
                      <ServiceUserEmailsCascade key={s} client={c} serviceName={s} label={s} />
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <Badge variant={c.usageStatus === 'active' ? 'active' : 'inactive'}>
                    {c.usageStatus === 'active' ? 'En uso' : 'Inactivo'}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-neutral-700" title="Fecha de ingreso al servicio">
                  {formatDateShort(c.createdAt)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
