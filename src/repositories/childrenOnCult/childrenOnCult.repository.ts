import { Injectable } from '@nestjs/common';
import { Pageable } from '../../configs/database/pageable.service';
import { PrismaService } from '../../configs/database/prisma.service';
import { Responsible } from '../../entities/responsible.entity';
import IChildrenOnCultRepository from './childrenOnCult.repository.contract';

@Injectable()
export class ChildrenOnCultRepository
  extends Pageable<Responsible>
  implements IChildrenOnCultRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  delete(id: string): Promise<Responsible> {
    return this.repository.responsible.delete({
      where: { id },
    });
  }

  findById(id: string): Promise<Responsible> {
    return this.repository.responsible.findUnique({
      where: { id },
    });
  }
}
