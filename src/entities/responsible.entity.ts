import { v4 as uuid } from 'uuid';
import { Children } from './children.entity';

export class Responsible {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childrens?: Array<Children>;
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: Omit<Responsible, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
