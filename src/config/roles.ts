const ROLES: Record<string, number> = {
  Admin: 4042,
  Editor: 3032,
  User: 1012
}

const ROLE_NAMES: Record<number, Role> = Object.fromEntries(
  Object.entries(ROLES).map(([name, value]) => [value, name])
) as Record<number, Role>;


export type Role = keyof typeof ROLES;

export { ROLES, ROLE_NAMES };