export enum Role {
  ADMIN = 1,
  USER = 2,
}

export const RoleName = {
  [Role.ADMIN]: 'ADMINISTRADOR',
  [Role.USER]: 'USUÀRIO',
} as const;
