import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Page, PageResponse } from '../configs/database/page.model';
import { FiltersUserDTO } from '../dtos/user/filtersUser.dto';
import IUserRepository from '../repositories/user/user.repository.contract';
import { CreateUserDTO } from '../dtos/user/createUser.dto';
import { MappedUserDTO } from '../dtos/user/mappedUser.dto';
import { UpdateUserDTO } from '../dtos/user/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(payload: CreateUserDTO): Promise<MappedUserDTO> {
    const password = bcrypt.hashSync(payload.password, 10);

    const user = await this.userRepository.create(
      new User({ ...payload, password }),
    );

    return this.mapperOne(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.listById(id);

    await this.userRepository.delete(user.id);

    return;
  }

  async listById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user)
      throw new HttpException(`Usuário não encontrado!`, HttpStatus.NOT_FOUND);

    return user;
  }

  async listByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new HttpException(`Usuário não encontrado!`, HttpStatus.NOT_FOUND);

    return user;
  }

  async listAll(
    page: Page,
    filters?: FiltersUserDTO,
  ): Promise<PageResponse<MappedUserDTO>> {
    const users = await this.userRepository.findAll(page, filters);

    const items = this.mapperMany(users.items);

    return {
      total: users.total,
      items,
    };
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.listById(id);

    return await this.userRepository.update(
      Object.assign(user, { ...user, ...data }),
    );
  }

  private mapperMany(users: User[]): MappedUserDTO[] {
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        type: user.type,
        createdAt: user.createdAt,
      };
    });
  }

  private mapperOne(user: User): MappedUserDTO {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
    };
  }
}
