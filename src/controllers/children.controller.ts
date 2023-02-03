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
import { ChildrenService } from '../services/children.service';
import { CreateChildrenDTO } from '../dtos/children/createChildren.dto';
import { UpdateChildrenDTO } from '../dtos/children/updateChildren.dto';
import { Page, PageResponse } from '../configs/database/page.model';
import { Children } from '../entities/children.entity';
import { FiltersChildrenDTO } from '../dtos/children/filtersChildren.dto';
import { MappedChildrenDTO } from '../dtos/children/mappedChildren.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('/api/childrens')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  @Roles('create-children')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateChildrenDTO): Promise<Children> {
    return await this.childrenService.create(payload);
  }

  @Delete('/:id')
  @Roles('delete-children')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.childrenService.delete(id);
  }

  @Put('/:id')
  @Roles('edit-children')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateChildrenDTO,
  ): Promise<Children> {
    return await this.childrenService.update(id, data);
  }

  @Get()
  @Roles('list-children')
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() page: Page,
    @Query() filters: FiltersChildrenDTO,
  ): Promise<PageResponse<MappedChildrenDTO>> {
    return await this.childrenService.listAll(page, filters);
  }

  @Get('/:id')
  @Roles('list-children')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<Children> {
    return await this.childrenService.listById(id);
  }
}
