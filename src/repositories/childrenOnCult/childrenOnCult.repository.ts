import { Injectable } from '@nestjs/common';
import { ChildrenOnCult } from '../../entities/childrenOnCult.entity';
import { getDateInLocaleTime } from '../../utils/date.service';
import { Pageable } from '../../configs/database/pageable.service';
import { PrismaService } from '../../configs/database/prisma.service';
import IChildrenOnCultRepository from './childrenOnCult.repository.contract';

@Injectable()
export class ChildrenOnCultRepository
  extends Pageable<ChildrenOnCult>
  implements IChildrenOnCultRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  findByCultAndChildren(
    cultId: string,
    childrenId: string,
  ): Promise<ChildrenOnCult> {
    return this.repository.childrenOnCult.findUnique({
      where: {
        cultId_childrenId: {
          childrenId,
          cultId,
        },
      },
    });
  }

  update(
    cultId: string,
    childrenId: string,
    data: ChildrenOnCult,
  ): Promise<ChildrenOnCult> {
    return this.repository.childrenOnCult.upsert({
      where: {
        cultId_childrenId: {
          cultId,
          childrenId,
        },
      },
      create: {
        cultId,
        childrenId,
        attendance: data.attendance,
        isInvited: data.isInvited,
        meditation: data.meditation,
        verse: data.verse,
        updatedAt: getDateInLocaleTime(new Date()),
      },
      update: {
        attendance: data.attendance,
        isInvited: data.isInvited,
        meditation: data.meditation,
        verse: data.verse,
        updatedAt: getDateInLocaleTime(new Date()),
      },
    });
  }
}
