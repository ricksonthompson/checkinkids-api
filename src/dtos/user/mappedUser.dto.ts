import { EUserType } from '@prisma/client';

export class MappedUserDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: EUserType;
  createdAt: Date;
}
