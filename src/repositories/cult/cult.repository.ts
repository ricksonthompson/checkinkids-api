import { Injectable } from '@nestjs/common';
import { Page, PageResponse } from '../../configs/database/page.model';
import { Pageable } from '../../configs/database/pageable.service';
import { PrismaService } from '../../configs/database/prisma.service';
import { getDateInLocaleTime } from '../../utils/date.service';
import { Cult } from '../../entities/cult.entity';
import ICultRepository from './cult.repository.contract';

@Injectable()
export class CultRepository extends Pageable<Cult> implements ICultRepository {
  constructor(private readonly repository: PrismaService) {
    super();
  }

  addChildrensOnCult(id: string, childrensIds: string[]): Promise<Cult> {
    return this.repository.cult.update({
      where: { id },
      data: {
        childrens: {
          createMany: {
            data: childrensIds.map((childrenId) => ({
              childrenId,
            })),
          },
        },
      },
    });
  }

  delete(id: string): Promise<Cult> {
    return this.repository.cult.delete({
      where: { id },
    });
  }

  update(data: Cult): Promise<any> {
    delete data.childrens;

    return this.repository.cult.update({
      where: { id: data.id },
      data: {
        updatedAt: getDateInLocaleTime(new Date()),
        date: data.date,
        shift: data.shift,
        status: data.status,
        time: data.time,
        title: data.title,
      },
    });
  }

  create(data: Cult): Promise<Cult> {
    return this.repository.cult.create({
      data: {
        id: data.id,
        date: data.date,
        title: data.title,
        shift: data.shift,
        time: data.time,
      },
    });
  }

  findById(id: string): Promise<Cult> {
    return this.repository.cult.findUnique({
      where: { id },
      include: {
        childrens: {
          include: {
            children: true,
            cult: true,
          },
        },
      },
    });
  }

  async findAll(page: Page): Promise<PageResponse<Cult>> {
    const items = await this.repository.cult.findMany({
      ...this.buildPage(page),
      include: {
        childrens: {
          include: {
            children: true,
            cult: true,
          },
        },
      },
    });

    const total = await this.repository.cult.count();

    return this.buildPageResponse(
      items,
      Array.isArray(total) ? total.length : total,
    );
  }
}
