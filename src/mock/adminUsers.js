/**
 * Administradores mock — solo para demo de login.
 * Sustituir por validación contra tu API / IdP.
 */
export const MOCK_ADMIN_USERS = [
  { username: 'admin', password: 'Admin2026!', displayName: 'Administrador general' },
  { username: 'ops.admin', password: 'Ops2026!', displayName: 'Admin operaciones' },
]

export function findAdminUser(username, password) {
  return MOCK_ADMIN_USERS.find((u) => u.username === username && u.password === password) ?? null
}
