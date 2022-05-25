import { SetMetadata } from '@nestjs/common';

export enum RoleOptions {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleOptions[]) => SetMetadata(ROLES_KEY, roles);
