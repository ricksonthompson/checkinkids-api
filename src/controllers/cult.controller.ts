import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Page, PageResponse } from '../configs/database/page.model';
import { CultService } from '../services/cult.service';
import { CreateCultDTO } from '../dtos/cult/createCult.dto';
import { Cult } from '../entities/cult.entity';
import { MappedCultDTO } from '../dtos/cult/mappedCult.dto';
import { AddChildrensOnCultDTO } from '../dtos/cult/addChildrensOnCult.dto';
import { UpdatePointsChildrensOnCultDTO } from '../dtos/childrensOnCult/updatePointsChildrensOnCult.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('/api/cults')
export class CultController {
  constructor(private readonly cultService: CultService) {}

  @Post()
  @Roles('create-cult')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCultDTO): Promise<Cult> {
    return await this.cultService.create(payload);
  }

  @Post('/:id/addChildrens')
  @Roles('edit-cult')
  @HttpCode(HttpStatus.OK)
  async addChildrensOnCult(
    @Param('id') id: string,
    @Body() payload: AddChildrensOnCultDTO,
  ): Promise<Cult> {
    return await this.cultService.addChildrensOnCult(id, payload);
  }

  @Get()
  @Roles('list-cult')
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() page: Page): Promise<PageResponse<MappedCultDTO>> {
    return await this.cultService.listAll(page);
  }

  @Get('/:id')
  @Roles('list-cult')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<MappedCultDTO> {
    return await this.cultService.listById(id);
  }

  @Put('/:id/childrens/:childrenId')
  @Roles('edit-cult')
  @HttpCode(HttpStatus.OK)
  async registerPoints(
    @Param('id') id: string,
    @Param('childrenId') childrenId: string,
    @Body() payload: UpdatePointsChildrensOnCultDTO,
  ): Promise<MappedCultDTO> {
    console.log(id);
    console.log(childrenId);
    console.log(payload);

    return await this.cultService.registerPointsChildren(
      id,
      childrenId,
      payload,
    );
  }
}
