/**
 * Mock data — reemplazar por llamadas API manteniendo la misma forma.
 * Campos cliente: id, name, company, email, phone, rfc, membershipStatus, …
 */

const now = new Date('2026-05-13T12:00:00.000Z')

function isoDaysAgo(days) {
  const d = new Date(now)
  d.setUTCDate(d.getUTCDate() - days)
  return d.toISOString()
}

function isoDaysFromNow(days) {
  const d = new Date(now)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString()
}

export const MEMBERSHIP_STATUSES = ['active', 'inactive', 'expired', 'pending']

export const SERVICE_CATALOG = [
  'FourKites Push',
  'FourKites Pull',
  'Tilatina API',
  'Protrans Sync',
  'EDI Integration',
  'Load Tracking',
]

export const clients = [
  {
    id: 'c-001',
    name: 'Mariana López',
    company: 'Nexus Freight MX',
    email: 'mariana.lopez@nexusfreight.mx',
    phone: '+52 55 9102 4411',
    rfc: 'NFM010330AB2',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(120),
    services: ['FourKites Push', 'FourKites Pull', 'Load Tracking'],
    integrations: [
      {
        id: 'i-001',
        label: 'FourKites Push',
        platform: 'FourKites',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-002',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(1),
      },
      {
        id: 'i-003',
        label: 'Load Tracking',
        platform: 'Internal',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(2),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(0),
    createdAt: isoDaysAgo(400),
    integrationLogs: [
      { id: 'l-1', at: isoDaysAgo(0), level: 'info', message: 'Webhook FourKites recibido — 42 envíos' },
      { id: 'l-2', at: isoDaysAgo(1), level: 'success', message: 'Pull completado sin errores' },
      { id: 'l-3', at: isoDaysAgo(3), level: 'warning', message: 'Latencia elevada en Tilatina (omitido)' },
    ],
  },
  {
    id: 'c-002',
    name: 'Diego Herrera',
    company: 'CargaAndina',
    email: 'dherrera@cargaandina.com',
    phone: '+57 1 789 2200',
    rfc: 'CAD920115KT7',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(14),
    services: ['Tilatina API', 'EDI Integration'],
    integrations: [
      {
        id: 'i-010',
        label: 'Tilatina API',
        platform: 'Tilatina',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-011',
        label: 'EDI Integration',
        platform: 'EDI',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(4),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(0),
    createdAt: isoDaysAgo(210),
    integrationLogs: [
      { id: 'l-10', at: isoDaysAgo(0), level: 'info', message: 'Sincronización Tilatina — 18 órdenes' },
      { id: 'l-11', at: isoDaysAgo(4), level: 'success', message: 'EDI 210 enviado a partner' },
    ],
  },
  {
    id: 'c-003',
    name: 'Laura Méndez',
    company: 'RutaSureste',
    email: 'laura.mendez@rutasureste.com',
    phone: '+52 998 120 3344',
    rfc: 'RUS851022PL3',
    membershipStatus: 'pending',
    membershipExpiration: isoDaysFromNow(2),
    services: ['Protrans Sync'],
    integrations: [
      {
        id: 'i-020',
        label: 'Protrans Sync',
        platform: 'Protrans',
        direction: 'pull',
        status: 'pending',
        lastSyncAt: isoDaysAgo(9),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(9),
    createdAt: isoDaysAgo(30),
    integrationLogs: [
      { id: 'l-20', at: isoDaysAgo(9), level: 'warning', message: 'Credenciales Protrans en revisión' },
    ],
  },
  {
    id: 'c-004',
    name: 'Andrés Vidal',
    company: 'PortLogistics EU',
    email: 'avidal@portlogistics.eu',
    phone: '+34 93 555 8899',
    rfc: 'PLE781201EU8',
    membershipStatus: 'expired',
    membershipExpiration: isoDaysFromNow(-12),
    services: ['FourKites Pull', 'Load Tracking'],
    integrations: [
      {
        id: 'i-030',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'inactive',
        lastSyncAt: isoDaysAgo(20),
      },
      {
        id: 'i-031',
        label: 'Load Tracking',
        platform: 'Internal',
        direction: 'pull',
        status: 'inactive',
        lastSyncAt: isoDaysAgo(21),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(20),
    createdAt: isoDaysAgo(900),
    integrationLogs: [
      { id: 'l-30', at: isoDaysAgo(20), level: 'error', message: 'Membresía vencida — integración pausada' },
    ],
  },
  {
    id: 'c-005',
    name: 'Camila Rojas',
    company: 'BlueLine Carriers',
    email: 'crojas@bluelinecarriers.com',
    phone: '+1 312 555 0198',
    rfc: 'BLC031105US1',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(300),
    services: ['FourKites Push', 'Protrans Sync', 'EDI Integration'],
    integrations: [
      {
        id: 'i-040',
        label: 'FourKites Push',
        platform: 'FourKites',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-041',
        label: 'Protrans Sync',
        platform: 'Protrans',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-042',
        label: 'EDI Integration',
        platform: 'EDI',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(2),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(0),
    createdAt: isoDaysAgo(540),
    integrationLogs: [
      { id: 'l-40', at: isoDaysAgo(0), level: 'success', message: 'Push FourKites — 11 actualizaciones' },
      { id: 'l-41', at: isoDaysAgo(0), level: 'info', message: 'Protrans — inventario alineado' },
    ],
  },
  {
    id: 'c-006',
    name: 'Felipe Castro',
    company: 'TransPacífico',
    email: 'fcastro@transpacifico.cl',
    phone: '+56 2 2666 7788',
    rfc: 'TCP881210CL9',
    membershipStatus: 'inactive',
    membershipExpiration: isoDaysFromNow(45),
    services: ['Tilatina API'],
    integrations: [
      {
        id: 'i-050',
        label: 'Tilatina API',
        platform: 'Tilatina',
        direction: 'pull',
        status: 'inactive',
        lastSyncAt: isoDaysAgo(40),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(40),
    createdAt: isoDaysAgo(120),
    integrationLogs: [
      { id: 'l-50', at: isoDaysAgo(40), level: 'warning', message: 'Cliente pausó uso — sin jobs programados' },
    ],
  },
  {
    id: 'c-007',
    name: 'Valentina Ruiz',
    company: 'MetroHaul',
    email: 'vruiz@metrohaul.co',
    phone: '+57 4 444 2211',
    rfc: 'MTH900315CO2',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(88),
    services: ['FourKites Pull', 'Tilatina API', 'Load Tracking'],
    integrations: [
      {
        id: 'i-060',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(1),
      },
      {
        id: 'i-061',
        label: 'Tilatina API',
        platform: 'Tilatina',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(1),
      },
      {
        id: 'i-062',
        label: 'Load Tracking',
        platform: 'Internal',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(5),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(1),
    createdAt: isoDaysAgo(300),
    integrationLogs: [
      { id: 'l-60', at: isoDaysAgo(1), level: 'info', message: 'Pull FourKites — 6 rutas' },
      { id: 'l-61', at: isoDaysAgo(1), level: 'success', message: 'Tilatina — documentos OK' },
    ],
  },
  {
    id: 'c-008',
    name: 'Jorge Pineda',
    company: 'Almacén Central',
    email: 'jpineda@almacencentral.com',
    phone: '+52 81 4400 9000',
    rfc: 'ACE950428MN5',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(200),
    services: ['EDI Integration', 'Load Tracking'],
    integrations: [
      {
        id: 'i-070',
        label: 'EDI Integration',
        platform: 'EDI',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(3),
      },
      {
        id: 'i-071',
        label: 'Load Tracking',
        platform: 'Internal',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(3),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(3),
    createdAt: isoDaysAgo(600),
    integrationLogs: [
      { id: 'l-70', at: isoDaysAgo(3), level: 'info', message: 'EDI 856 generado' },
    ],
  },
  {
    id: 'c-009',
    name: 'Paula Gómez',
    company: 'SwiftCold Chain',
    email: 'pgomez@swiftcold.com',
    phone: '+1 786 555 2200',
    rfc: 'SCC881109TX0',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(30),
    services: ['FourKites Push', 'FourKites Pull'],
    integrations: [
      {
        id: 'i-080',
        label: 'FourKites Push',
        platform: 'FourKites',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-081',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(0),
    createdAt: isoDaysAgo(150),
    integrationLogs: [
      { id: 'l-80', at: isoDaysAgo(0), level: 'success', message: 'Temperatura reportada a FourKites' },
    ],
  },
  {
    id: 'c-010',
    name: 'Ricardo Soto',
    company: 'LTL Express',
    email: 'rsoto@ltlexpress.com',
    phone: '+52 442 330 1188',
    rfc: 'LTL010220GJ4',
    membershipStatus: 'expired',
    membershipExpiration: isoDaysFromNow(-3),
    services: ['Protrans Sync', 'EDI Integration'],
    integrations: [
      {
        id: 'i-090',
        label: 'Protrans Sync',
        platform: 'Protrans',
        direction: 'pull',
        status: 'inactive',
        lastSyncAt: isoDaysAgo(10),
      },
      {
        id: 'i-091',
        label: 'EDI Integration',
        platform: 'EDI',
        direction: 'push',
        status: 'inactive',
        lastSyncAt: isoDaysAgo(10),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(10),
    createdAt: isoDaysAgo(480),
    integrationLogs: [
      { id: 'l-90', at: isoDaysAgo(10), level: 'error', message: 'Renovación pendiente — EDI en cola' },
    ],
  },
  {
    id: 'c-011',
    name: 'Natalia Ibáñez',
    company: 'Iberia Logistics',
    email: 'nibanez@iberialogistics.es',
    phone: '+34 91 600 4455',
    rfc: 'IBL020311ES6',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(365),
    services: ['FourKites Pull', 'Tilatina API', 'EDI Integration', 'Load Tracking'],
    integrations: [
      {
        id: 'i-100',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(2),
      },
      {
        id: 'i-101',
        label: 'Tilatina API',
        platform: 'Tilatina',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(2),
      },
      {
        id: 'i-102',
        label: 'EDI Integration',
        platform: 'EDI',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(6),
      },
      {
        id: 'i-103',
        label: 'Load Tracking',
        platform: 'Internal',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(6),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(2),
    createdAt: isoDaysAgo(720),
    integrationLogs: [
      { id: 'l-100', at: isoDaysAgo(2), level: 'info', message: 'Consolidación EU — 27 registros' },
    ],
  },
  {
    id: 'c-012',
    name: 'Esteban Morales',
    company: 'FríoRápido',
    email: 'emorales@friorapido.com.ar',
    phone: '+54 11 5555 7788',
    rfc: 'FRP001205AR7',
    membershipStatus: 'pending',
    membershipExpiration: isoDaysFromNow(60),
    services: ['FourKites Push'],
    integrations: [
      {
        id: 'i-110',
        label: 'FourKites Push',
        platform: 'FourKites',
        direction: 'push',
        status: 'pending',
        lastSyncAt: isoDaysAgo(15),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(15),
    createdAt: isoDaysAgo(12),
    integrationLogs: [
      { id: 'l-110', at: isoDaysAgo(15), level: 'warning', message: 'Onboarding — prueba de conectividad' },
    ],
  },
  {
    id: 'c-013',
    name: 'Lucía Fernández',
    company: 'Horizon TMS',
    email: 'lfernandez@horizontms.com',
    phone: '+1 415 555 8844',
    rfc: 'HRT990601CA8',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(180),
    services: ['Protrans Sync', 'Load Tracking'],
    integrations: [
      {
        id: 'i-120',
        label: 'Protrans Sync',
        platform: 'Protrans',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(1),
      },
      {
        id: 'i-121',
        label: 'Load Tracking',
        platform: 'Internal',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(1),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(1),
    createdAt: isoDaysAgo(260),
    integrationLogs: [
      { id: 'l-120', at: isoDaysAgo(1), level: 'success', message: 'Protrans — 9 cargas sincronizadas' },
    ],
  },
  {
    id: 'c-014',
    name: 'Gabriel Núñez',
    company: 'CostaCargo',
    email: 'gnunez@costacargo.com',
    phone: '+52 229 880 1200',
    rfc: 'CCG940714VE9',
    membershipStatus: 'inactive',
    membershipExpiration: isoDaysFromNow(10),
    services: ['Tilatina API', 'FourKites Pull'],
    integrations: [
      {
        id: 'i-130',
        label: 'Tilatina API',
        platform: 'Tilatina',
        direction: 'pull',
        status: 'inactive',
        lastSyncAt: isoDaysAgo(60),
      },
      {
        id: 'i-131',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'inactive',
        lastSyncAt: isoDaysAgo(60),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(60),
    createdAt: isoDaysAgo(400),
    integrationLogs: [
      { id: 'l-130', at: isoDaysAgo(60), level: 'warning', message: 'Cuenta marcada como inactiva por el cliente' },
    ],
  },
  {
    id: 'c-015',
    name: 'Isabel Duarte',
    company: 'Panamax Integrations',
    email: 'iduarte@panamax.io',
    phone: '+507 836 4400',
    rfc: 'PAN050305PA0',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(240),
    services: ['FourKites Push', 'FourKites Pull', 'Tilatina API', 'Protrans Sync'],
    integrations: [
      {
        id: 'i-140',
        label: 'FourKites Push',
        platform: 'FourKites',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-141',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-142',
        label: 'Tilatina API',
        platform: 'Tilatina',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(0),
      },
      {
        id: 'i-143',
        label: 'Protrans Sync',
        platform: 'Protrans',
        direction: 'pull',
        status: 'active',
        lastSyncAt: isoDaysAgo(1),
      },
    ],
    usageStatus: 'active',
    lastActivity: isoDaysAgo(0),
    createdAt: isoDaysAgo(950),
    integrationLogs: [
      { id: 'l-140', at: isoDaysAgo(0), level: 'success', message: 'Cuadrante multi-plataforma OK' },
    ],
  },
  {
    id: 'c-016',
    name: 'Tomás Aguirre',
    company: 'RedLog Norte',
    email: 'taguirre@redlognorte.com',
    phone: '+52 664 120 8899',
    rfc: 'RLN880908NL1',
    membershipStatus: 'active',
    membershipExpiration: isoDaysFromNow(95),
    services: ['EDI Integration', 'FourKites Push'],
    integrations: [
      {
        id: 'i-150',
        label: 'EDI Integration',
        platform: 'EDI',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(4),
      },
      {
        id: 'i-151',
        label: 'FourKites Push',
        platform: 'FourKites',
        direction: 'push',
        status: 'active',
        lastSyncAt: isoDaysAgo(4),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(4),
    createdAt: isoDaysAgo(330),
    integrationLogs: [
      { id: 'l-150', at: isoDaysAgo(4), level: 'info', message: 'EDI 214 enviado' },
    ],
  },
  {
    id: 'c-017',
    name: 'Carolina Mejía',
    company: 'UrbanLastMile',
    email: 'cmejia@urbanlastmile.com',
    phone: '+1 646 555 7711',
    rfc: 'URB220101UM2',
    membershipStatus: 'pending',
    membershipExpiration: isoDaysFromNow(7),
    services: ['Load Tracking', 'FourKites Pull'],
    integrations: [
      {
        id: 'i-160',
        label: 'Load Tracking',
        platform: 'Internal',
        direction: 'pull',
        status: 'pending',
        lastSyncAt: isoDaysAgo(1),
      },
      {
        id: 'i-161',
        label: 'FourKites Pull',
        platform: 'FourKites',
        direction: 'pull',
        status: 'pending',
        lastSyncAt: isoDaysAgo(1),
      },
    ],
    usageStatus: 'idle',
    lastActivity: isoDaysAgo(1),
    createdAt: isoDaysAgo(5),
    integrationLogs: [
      { id: 'l-160', at: isoDaysAgo(1), level: 'warning', message: 'Esperando firma de contrato' },
    ],
  },
]

export function getClientById(id) {
  return clients.find((c) => c.id === id) ?? null
}

export function getRecentActivity(limit = 8) {
  const rows = []
  for (const c of clients) {
    for (const log of c.integrationLogs) {
      rows.push({
        id: `${c.id}-${log.id}`,
        clientId: c.id,
        clientName: c.company,
        ...log,
      })
    }
  }
  rows.sort((a, b) => new Date(b.at) - new Date(a.at))
  return rows.slice(0, limit)
}

export function getDashboardStats() {
  const activeClients = clients.filter(
    (c) => c.membershipStatus === 'active' && c.services.length > 0,
  ).length
  const validMemberships = clients.filter((c) => {
    if (c.membershipStatus !== 'active' && c.membershipStatus !== 'pending') return false
    return new Date(c.membershipExpiration) >= now
  }).length
  const expiredMemberships = clients.filter((c) => {
    return c.membershipStatus === 'expired' || new Date(c.membershipExpiration) < now
  }).length

  let activeIntegrations = 0
  let pushCount = 0
  let pullCount = 0
  for (const c of clients) {
    for (const int of c.integrations) {
      if (int.status === 'active') activeIntegrations += 1
      if (int.direction === 'push') pushCount += 1
      if (int.direction === 'pull') pullCount += 1
    }
  }

  return {
    activeClients,
    validMemberships,
    expiredMemberships,
    activeIntegrations,
    pushConnections: pushCount,
    pullConnections: pullCount,
  }
}

export function flattenIntegrations() {
  const list = []
  for (const c of clients) {
    for (const int of c.integrations) {
      list.push({
        ...int,
        clientId: c.id,
        clientName: c.name,
        clientCompany: c.company,
      })
    }
  }
  return list
}
