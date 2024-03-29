import { Injectable } from '@nestjs/common';
import { Page, PageResponse } from '../../configs/database/page.model';
import { Pageable } from '../../configs/database/pageable.service';
import { PrismaService } from '../../configs/database/prisma.service';
import { Responsible } from '../../entities/responsible.entity';
import IResponsibleRepository from './responsible.repository.contract';
import { getDateInLocaleTime } from '../../utils/date.service';

@Injectable()
export class ResponsibleRepository
  extends Pageable<Responsible>
  implements IResponsibleRepository
{
  constructor(private readonly repository: PrismaService) {
    super();
  }

  delete(id: string): Promise<Responsible> {
    return this.repository.responsible.delete({
      where: { id },
    });
  }

  update(data: Responsible): Promise<any> {
    return this.repository.responsible.update({
      where: { id: data.id },
      data: {
        updatedAt: getDateInLocaleTime(new Date()),
      },
    });
  }

  findById(id: string): Promise<Responsible> {
    return this.repository.responsible.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<Responsible> {
    return this.repository.responsible.findFirst({
      where: { email },
    });
  }

  findByPhone(phone: string): Promise<Responsible> {
    return this.repository.responsible.findFirst({
      where: { phone },
    });
  }

  async findAll(page: Page): Promise<PageResponse<Responsible>> {
    const items = await this.repository.responsible.findMany({
      ...this.buildPage(page),
    });

    const total = await this.repository.responsible.count();

    return this.buildPageResponse(
      items,
      Array.isArray(total) ? total.length : total,
    );
  }

  create(data: Responsible): Promise<Responsible> {
    return this.repository.responsible.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
  }
}
