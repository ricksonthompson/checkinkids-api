import { Injectable } from '@nestjs/common';
import { FiltersChildrenDTO } from '../../dtos/children/filtersChildren.dto';
import { Page, PageResponse } from '../../configs/database/page.model';
import { Pageable } from '../../configs/database/pageable.service';
import { PrismaService } from '../../configs/database/prisma.service';
import { Children } from '../../entities/children.entity';
import IChildrenRepository from './children.repository.contract';
import { getDateInLocaleTime } from '../../utils/date.service';

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
    const { address } = data;

    delete address.childrenId;

    return this.repository.children.update({
      where: { id: data.id },
      data: {
        ...data,
        updatedAt: getDateInLocaleTime(new Date()),
        address: data.address
          ? {
              upsert: {
                update: address,
                create: address,
              },
            }
          : undefined,
      },
      include: { address: true },
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
    const items = await this.repository.children.findMany({
      ...this.buildPage(page),
    });

    const total = await this.repository.children.count();

    return this.buildPageResponse(
      items,
      Array.isArray(total) ? total.length : total,
    );
  }

  create(data: Children): Promise<Children> {
    return this.repository.children.create({
      data: {
        id: data.id,
        birthDate: data.birthDate,
        firstName: data.firstName,
        lastName: data.lastName,
        observations: data.observations,
        address: {
          create: data.address,
        },
        responsibles: {
          createMany: {
            data: data.responsiblesProps.map((item) => {
              return {
                responsibleId: item.responsibleId,
                type: item.type,
              };
            }),
          },
        },
      },
      include: {
        address: true,
        responsibles: {
          select: {
            responsible: true,
          },
        },
      },
    });
  }
}
