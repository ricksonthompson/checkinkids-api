import { Responsible } from '../../entities/responsible.entity';

export class MappedChildrenDTO {
  id: string;
  name: string;
  birthDate: Date;
  observations: string;
  responsibles: Responsible[];
  createdAt: Date;
}
