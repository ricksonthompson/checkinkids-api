import { EShiftCult, EStatusCult } from '@prisma/client';
import { Responsible } from '../../entities/responsible.entity';

export class MappedCultDTO {
  id: string;
  title: string;
  date: Date;
  time: string;
  status: EStatusCult;
  shift: EShiftCult;
  childrens: {
    id: string;
    name: string;
    birthDate: Date;
    observations: string;
    responsibles: Responsible[];
    verse?: boolean;
    meditation?: boolean;
    attendance?: boolean;
    isInvited?: boolean;
    updatedAt: Date;
  }[];
  createdAt: Date;
}
