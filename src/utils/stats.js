import { clients } from '../mock/clients'

export function serviceHealthSummary() {
  const map = {}
  for (const c of clients) {
    for (const int of c.integrations) {
      const key = int.platform
      if (!map[key]) {
        map[key] = { platform: key, active: 0, issues: 0, total: 0 }
      }
      map[key].total += 1
      if (int.status === 'active') map[key].active += 1
      else map[key].issues += 1
    }
  }
  return Object.values(map).sort((a, b) => b.total - a.total)
}
