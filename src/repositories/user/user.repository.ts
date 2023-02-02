import { Injectable } from '@nestjs/common';
import { Page, PageResponse } from '../../configs/database/page.model';
import { Pageable } from '../../configs/database/pageable.service';
import { PrismaService } from '../../configs/database/prisma.service';
import IUserRepository from './user.repository.contract';
import { getDateInLocaleTime } from '../../utils/date.service';
import { FiltersUserDTO } from '../../dtos/user/filtersUser.dto';
import { User } from '../../entities/user.entity';
import { generateQueryForUsers } from '../../configs/database/Queries';

@Injectable()
export class UserRepository extends Pageable<User> implements IUserRepository {
  constructor(private readonly repository: PrismaService) {
    super();
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.user.findFirst({
      where: { email },
    });
  }

  delete(id: string): Promise<User> {
    return this.repository.user.delete({
      where: { id },
    });
  }

  update(data: User): Promise<User> {
    return this.repository.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        phone: data.phone,
        type: data.type,
        name: data.name,
        updatedAt: getDateInLocaleTime(new Date()),
      },
    });
  }

  findById(id: string): Promise<User> {
    return this.repository.user.findUnique({
      where: { id },
    });
  }

  async findAll(
    page: Page,
    filters: FiltersUserDTO,
  ): Promise<PageResponse<User>> {
    const condition = generateQueryForUsers(filters);

    const items = condition
      ? await this.repository.user.findMany({
          ...this.buildPage(page),
          where: condition,
        })
      : await this.repository.user.findMany({
          ...this.buildPage(page),
        });

    const total = await this.repository.user.count();

    return this.buildPageResponse(items, condition ? items.length : total);
  }

  create(data: User): Promise<User> {
    return this.repository.user.create({
      data: {
        id: data.id,
        name: data.name,
        password: data.password,
        phone: data.phone,
        type: data.type,
        email: data.email,
        profileUrl: data.profileUrl,
        createdAt: getDateInLocaleTime(new Date()),
      },
    });
  }
}
