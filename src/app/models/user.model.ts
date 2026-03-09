import { BaseEntity } from './base-entity';

export type UserRole = 'admin' | 'guest';

export interface User extends BaseEntity {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
