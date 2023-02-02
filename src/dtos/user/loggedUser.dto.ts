import { EUserType } from '@prisma/client';

export class LoggedUserDTO {
  id: string;
  name: string;
  phone: string;
  email: string;
  profileUrl?: string;
  type: EUserType;
  token: string;
  createdAt: Date;
  updatedAt?: Date;
}
