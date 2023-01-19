import { Responsible } from '../../entities/responsible.entity';

export class MappedCultDTO {
  id: string;
  title: string;
  date: Date;
  time: string;
  status: string;
  childrens: {
    id: string;
    name: string;
    birthDate: Date;
    observations: string;
    responsibles: Responsible[];
    verse?: boolean;
    meditation?: boolean;
    attendance?: boolean;
    isVisited?: boolean;
  }[];
  createdAt: Date;
}
