import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Page, PageResponse } from '../configs/database/page.model';
import { CultService } from '../services/cult.service';
import { CreateCultDTO } from '../dtos/cult/createCult.dto';
import { Cult } from '../entities/cult.entity';
import { MappedCultDTO } from '../dtos/cult/mappedCult.dto';
import { AddChildrensOnCultDTO } from '../dtos/cult/addChildrensOnCult.dto';

@Controller('/api/cults')
export class CultController {
  constructor(private readonly cultService: CultService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCultDTO): Promise<Cult> {
    return await this.cultService.create(payload);
  }

  @Post('/:id/addChildrens')
  @HttpCode(HttpStatus.OK)
  async addChildrensOnCult(
    @Param('id') id: string,
    @Body() payload: AddChildrensOnCultDTO,
  ): Promise<Cult> {
    return await this.cultService.addChildrensOnCult(id, payload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() page: Page): Promise<PageResponse<MappedCultDTO>> {
    return await this.cultService.listAll(page);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<MappedCultDTO> {
    return await this.cultService.listById(id);
  }
}
