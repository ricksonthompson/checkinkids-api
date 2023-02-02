import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Page, PageResponse } from '../configs/database/page.model';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/user/createUser.dto';
import { UpdateUserDTO } from '../dtos/user/updateUser.dto';
import { FiltersUserDTO } from '../dtos/user/filtersUser.dto';
import { MappedUserDTO } from '../dtos/user/mappedUser.dto';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDTO): Promise<MappedUserDTO> {
    return await this.userService.create(payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<MappedUserDTO> {
    return await this.userService.update(id, data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() page: Page,
    @Query() filters: FiltersUserDTO,
  ): Promise<PageResponse<MappedUserDTO>> {
    return await this.userService.listAll(page, filters);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<MappedUserDTO> {
    return await this.userService.listById(id);
  }
}
