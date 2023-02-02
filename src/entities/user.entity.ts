import { EUserType } from '@prisma/client';
import { v4 as uuid } from 'uuid';

export class User {
  id: string;
  name: string;
  phone: string;
  email: string;
  profileUrl?: string;
  type: EUserType;
  password: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: Omit<User, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
