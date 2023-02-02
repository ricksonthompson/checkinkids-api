import { Injectable } from '@nestjs/common';
import { Page, PageResponse } from '../../configs/database/page.model';
import { Pageable } from '../../configs/database/pageable.service';
import { PrismaService } from '../../configs/database/prisma.service';
import { Children } from '../../entities/children.entity';
import IChildrenRepository from './children.repository.contract';
import { getDateInLocaleTime } from '../../utils/date.service';
import { generateQueryForChildrens } from '../../configs/database/Queries';
import { FiltersChildrenDTO } from '../../dtos/children/filtersChildren.dto';

@Injectable()
export class ChildrenRepository
  extends Pageable<Children>
  implements IChildrenRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  delete(id: string): Promise<Children> {
    return this.repository.children.delete({
      where: { id },
    });
  }

  update(data: Children): Promise<Children> {
    return this.repository.children.update({
      where: { id: data.id },
      data: {
        birthDate: data.birthDate,
        updatedAt: getDateInLocaleTime(new Date()),
      },
    });
  }

  findById(id: string): Promise<Children> {
    return this.repository.children.findUnique({
      where: { id },
    });
  }

  async findAll(
    page: Page,
    filters: FiltersChildrenDTO,
  ): Promise<PageResponse<Children>> {
    const condition = generateQueryForChildrens(filters);

    const items = condition
      ? await this.repository.children.findMany({
          ...this.buildPage(page),
          where: condition,
          include: {
            responsibles: true,
          },
        })
      : await this.repository.children.findMany({
          ...this.buildPage(page),
          include: {
            responsibles: true,
          },
        });

    const total = await this.repository.children.count();

    return this.buildPageResponse(items, condition ? items.length : total);
  }

  create(data: Children): Promise<Children> {
    return this.repository.children.create({
      data: {
        id: data.id,
        birthDate: data.birthDate,
        name: data.name,
        observations: data.observations,
        responsibles: data.responsibles.length
          ? {
              connect: data.responsibles.map((_responsible) => ({
                id: _responsible.id,
              })),
            }
          : undefined,
        createdAt: getDateInLocaleTime(new Date()),
      },
      include: {
        responsibles: true,
      },
    });
  }
}
