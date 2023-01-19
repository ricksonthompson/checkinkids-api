import { ETimeCult } from '../utils/ETypes';
import { v4 as uuid } from 'uuid';
import { ChildrenOnCult } from './childrenOnCult.entity';
import { EShiftCult, EStatusCult } from '@prisma/client';

export class Cult {
  id: string;
  date: Date;
  time: ETimeCult | string;
  title: string;
  status?: EStatusCult;
  shift: EShiftCult;
  childrens?: ChildrenOnCult[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: Omit<Cult, 'id' | 'createdAt'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
