import { EStatusCult, EShiftCult } from '../../utils/ETypes';

export class UpdateCultDTO {
  date: Date;
  title: string;
  status: EStatusCult;
  shift: EShiftCult;
}
