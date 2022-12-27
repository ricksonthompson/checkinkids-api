import { v4 as uuid } from 'uuid';

export class Address {
  id: string;
  state: string;
  city: string;
  name?: string;
  street?: string;
  number?: number;
  complement?: string;
  createdAt: Date;
  updatedAt?: Date;
  childrenId?: string;

  constructor(props: Omit<Address, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);
    this.createdAt = new Date();
    this.id = id ?? uuid();
  }
}
