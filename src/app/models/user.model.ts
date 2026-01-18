import { BaseEntity } from './base-entity';

export interface User extends BaseEntity {
  username: string;
  email: string;
  role: 'admin' | 'guest'; // Strict typing for roles
}