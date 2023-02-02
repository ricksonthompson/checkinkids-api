import { EUserType } from '@prisma/client';

export interface IQueryUser {
  name?: {
    contains: string;
  };
  phone?: string;
  email?: string;
  type?: EUserType;
}
