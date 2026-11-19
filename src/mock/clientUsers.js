/**
 * Usuarios mock de la **empresa contratante** en GMIntegra: personas con acceso al portal
 * y credenciales técnicas **solo en los servicios habilitados** para cada usuario.
 * No representan al público ni a clientes finales de esa empresa.
 * En producción: API segura; no exponer secretos en claro sin cifrado y auditoría.
 */

import { PORTAL_LOGIN_DOMAIN } from '../config/brand'

function hashSeed(str) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Servicios contratados que este usuario tiene habilitados (mock, determinista).
 * @param {object | null} client
 * @param {string} userKey — p. ej. 'ops' | 'sys' | 'log'
 * @returns {string[]}
 */
export function getEnabledServicesForUser(client, userKey) {
  const services = client?.services ?? []
  if (services.length === 0) return []
  const n = services.length
  if (n === 1) return [services[0]]

  const h = hashSeed(`${client.id}#${userKey}`)
  const salt =
    userKey === 'ops' ? 0x9e3779b1 : userKey === 'sys' ? 0xa54ff53a : 0x6d2b79fd

  const out = []
  for (let i = 0; i < n; i++) {
    if (((h + salt + i * 13) >>> (i % 11)) & 1) {
      out.push(services[i])
    }
  }
  if (out.length === 0) {
    out.push(services[h % n])
  }
  return out
}

function buildServiceCredentials(client, userKey, enabledServiceNames) {
  const map = {}
  for (const svc of enabledServiceNames) {
    const slug = svc.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()
    map[svc] = {
      username: `${slug}_${userKey}`,
      password: `Demo_${userKey}_${String(svc.length).padStart(2, '0')}!`,
    }
  }
  return map
}

/** Tres nombres por conjunto: operaciones, TI, logística (orden fijo por clave ops/sys/log). */
const MOCK_USER_NAME_SETS = [
  ['María Elena Ríos', 'Carlos Mendoza', 'Andrea Ibarra'],
  ['Luis Fernando Delgado', 'Patricia Navarro', 'Roberto Sánchez'],
  ['Daniela Ortiz', 'Jorge Huerta', 'Silvia Campos'],
  ['Fernanda López', 'Miguel Ángel Prieto', 'Lucía Herrera'],
  ['Ricardo Villanueva', 'Gabriela Mota', 'Esteban Quiroz'],
]

/** Fecha de ingreso del usuario al servicio (entre alta de la empresa y hoy, mock determinista). */
function userJoinedAt(client, userKey) {
  const companyStart = new Date(client.createdAt).getTime()
  const end = Date.now()
  if (end <= companyStart) return client.createdAt
  const h = hashSeed(`${client.id}#${userKey}#join`)
  const fraction = 0.08 + (h % 75) / 100
  return new Date(companyStart + (end - companyStart) * fraction).toISOString()
}

/** Costo mensual mock por usuario (licencia + servicios habilitados). */
function userMonthlyCost(client, userKey, enabledCount) {
  const base = 890
  const perService = 520
  const variance = (hashSeed(`${client.id}#${userKey}#cost`) % 12) * 50
  return base + enabledCount * perService + variance
}

function slugForEmail(fullName) {
  const s = fullName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
  const parts = s.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'usuario'
  const first = parts[0].replace(/[^a-z0-9]/g, '')
  const last = parts.length > 1 ? parts[parts.length - 1].replace(/[^a-z0-9]/g, '') : ''
  const core = last && last !== first ? `${first}.${last}` : first
  return core || 'usuario'
}

/**
 * @param {object | null} client — registro de la empresa en el mock (services, id, rfc).
 * @returns {Array<{ id: string, displayName: string, email: string, joinedAt: string, monthlyCost: number, portalLogin: string, portalPassword: string, enabledServices: string[], byService: Record<string, { username: string, password: string }> }>}
 */
export function getUsersForClient(client) {
  if (!client) return []

  const profiles = [{ key: 'ops', slot: 0 }, { key: 'sys', slot: 1 }, { key: 'log', slot: 2 }]

  const count = Math.min(3, Math.max(2, 1 + (client.services.length % 3)))
  const mailDomain = client.email?.includes('@') ? client.email.split('@')[1] : 'empresa.mock'
  const nameSet = MOCK_USER_NAME_SETS[hashSeed(client.id) % MOCK_USER_NAME_SETS.length]
  const idSuffix = client.id.replace('c-', '')

  return profiles.slice(0, count).map((p, i) => {
    const displayName = nameSet[p.slot]
    const slug = slugForEmail(displayName)
    const enabledServices = getEnabledServicesForUser(client, p.key)
    return {
      id: `${client.id}-user-${p.key}`,
      displayName,
      email: `${slug}.${idSuffix}@${mailDomain}`,
      joinedAt: userJoinedAt(client, p.key),
      monthlyCost: userMonthlyCost(client, p.key, enabledServices.length),
      portalLogin: `${slug}.${idSuffix}@${PORTAL_LOGIN_DOMAIN}`,
      portalPassword: `Portal${i + 1}!${(client.rfc ?? 'XXX').slice(0, 4)}`,
      enabledServices,
      byService: buildServiceCredentials(client, p.key, enabledServices),
    }
  })
}

/**
 * Usuarios de la empresa con credencial mock para un servicio concreto.
 * @param {object | null} client
 * @param {string} serviceName
 * @returns {Array<{ id: string, displayName: string, email: string }>}
 */
export function getUserAccessListForService(client, serviceName) {
  if (!client?.services?.includes(serviceName)) return []
  return getUsersForClient(client)
    .filter((u) => Boolean(u.byService?.[serviceName]))
    .map((u) => ({
      id: u.id,
      displayName: u.displayName,
      email: u.email,
    }))
}

/**
 * @param {object | null} client
 * @param {string} userId — id devuelto por getUsersForClient (p. ej. c-1-user-ops)
 * @returns {object | null}
 */
export function getClientUserById(client, userId) {
  if (!client || !userId) return null
  return getUsersForClient(client).find((u) => u.id === userId) ?? null
}
