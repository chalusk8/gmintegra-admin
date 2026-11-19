import { useMemo, useState } from 'react'
import { clients } from '../mock/clients'

export function useClients() {
  const [query, setQuery] = useState('')
  const [membershipFilter, setMembershipFilter] = useState('all')
  const [usageFilter, setUsageFilter] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clients.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.rfc && c.rfc.toLowerCase().includes(q)) ||
        c.services.some((s) => s.toLowerCase().includes(q))

      const matchesMembership =
        membershipFilter === 'all' || c.membershipStatus === membershipFilter

      const matchesUsage = usageFilter === 'all' || c.usageStatus === usageFilter

      return matchesQuery && matchesMembership && matchesUsage
    })
  }, [query, membershipFilter, usageFilter])

  return {
    clients: filtered,
    query,
    setQuery,
    membershipFilter,
    setMembershipFilter,
    usageFilter,
    setUsageFilter,
  }
}
