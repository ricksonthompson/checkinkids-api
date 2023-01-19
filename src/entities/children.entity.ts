import { v4 as uuid } from 'uuid';
import { ChildrenOnCult } from './childrenOnCult.entity';
import { Responsible } from './responsible.entity';

export class Children {
  id: string;
  name: string;
  birthDate: Date;
  observations?: string;
  responsibles?: Responsible[];
  cults?: ChildrenOnCult;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    props: Omit<Children, 'id' | 'createdAt'>,
    responsibles?: Responsible[],
    id?: string,
  ) {
    Object.assign(this, props);
    this.responsibles = responsibles;
    this.id = id ?? uuid();
  }
}
