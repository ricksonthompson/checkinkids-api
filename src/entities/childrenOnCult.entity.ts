import { Children } from './children.entity';
import { Cult } from './cult.entity';

export class ChildrenOnCult {
  cult: Cult;
  children: Children;
  verse?: boolean;
  meditation?: boolean;
  attendance?: boolean;
  isVisited?: boolean;
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: Omit<ChildrenOnCult, 'id' | 'createdAt'>) {
    Object.assign(this, props);
  }
}
