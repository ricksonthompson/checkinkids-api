import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cult } from '../entities/cult.entity';
import ICultRepository from '../repositories/cult/cult.repository.contract';
import { Page, PageResponse } from '../configs/database/page.model';
import { CreateCultDTO } from '../dtos/cult/createCult.dto';
import { MappedCultDTO } from '../dtos/cult/mappedCult.dto';
import { MappedChildrenDTO } from '../dtos/children/mappedChildren.dto';
import { UpdateCultDTO } from '../dtos/cult/updateCult.dto';
import { AddChildrensOnCultDTO } from 'src/dtos/cult/addChildrensOnCult.dto';
import { Children } from 'src/entities/children.entity';
import { ChildrenService } from './children.service';

@Injectable()
export class CultService {
  constructor(
    @Inject('ICultRepository')
    private readonly cultRepository: ICultRepository,
    private readonly childrenService: ChildrenService,
  ) {}

  async create(payload: CreateCultDTO): Promise<Cult> {
    return await this.cultRepository.create(new Cult(payload));
  }

  async addChildrensOnCult(
    id: string,
    payload: AddChildrensOnCultDTO,
  ): Promise<Cult> {
    const childrens: Children[] = [];
    const { childrensId } = payload;
    const cult = await this.cultRepository.findById(id);

    if (!cult) {
      throw new HttpException('Culto não encontrado!', HttpStatus.NOT_FOUND);
    }

    for await (const id of childrensId) {
      childrens.push(await this.childrenService.listById(id));
    }

    if (cult.childrens.length) {
      if (
        cult.childrens.find((childrens) =>
          childrensId.includes(childrens.children.id),
        )
      ) {
        throw new HttpException(
          'A criança já foi adicionada ao culto!',
          HttpStatus.CONFLICT,
        );
      }
    }

    return await this.cultRepository.addChildrensOnCult(cult.id, childrensId);
  }

  async delete(id: string): Promise<void> {
    const cult = await this.listById(id);

    await this.cultRepository.delete(cult.id);

    return;
  }

  async listById(id: string): Promise<MappedCultDTO> {
    const cult = await this.cultRepository.findById(id);

    if (!cult)
      throw new HttpException('Culto não encontrado!', HttpStatus.NOT_FOUND);

    return this.mapperOne(cult);
  }

  async listAll(
    page: Page,
    filters?: any,
  ): Promise<PageResponse<MappedCultDTO>> {
    const cults = await this.cultRepository.findAll(page, filters);

    const items = this.mapperMany(cults.items);

    return {
      total: cults.total,
      items,
    };
  }

  async update(id: string, data: UpdateCultDTO): Promise<Cult> {
    const cult = await this.cultRepository.findById(id);

    if (!cult) {
      throw new HttpException('Culto não encontrado!', HttpStatus.NOT_FOUND);
    }

    return await this.cultRepository.update(
      Object.assign(cult, { ...cult, ...data }),
    );
  }

  private mapperMany(cults: Cult[]): MappedCultDTO[] {
    return cults.map((cult) => {
      return {
        id: cult.id,
        date: cult.date,
        createdAt: cult.createdAt,
        status: cult.status,
        title: cult.title,
        childrens: cult.childrens.length
          ? cult.childrens.map((item) => ({
              id: item.children.id,
              name: item.children.name,
              birthDate: item.children.birthDate,
              responsibles: item.children.responsibles,
              observations: item.children.observations,
              verse: item.verse,
              meditation: item.meditation,
              attendance: item.attendance,
              isVisited: item.isVisited,
            }))
          : null,
      };
    });
  }

  private mapperOne(cult: Cult): MappedCultDTO {
    return {
      id: cult.id,
      date: cult.date,
      createdAt: cult.createdAt,
      status: cult.status,
      title: cult.title,
      childrens: cult.childrens.length
        ? cult.childrens.map((item) => ({
            id: item.children.id,
            name: item.children.name,
            birthDate: item.children.birthDate,
            responsibles: item.children.responsibles,
            observations: item.children.observations,
            verse: item.verse,
            meditation: item.meditation,
            attendance: item.attendance,
            isVisited: item.isVisited,
          }))
        : null,
    };
  }
}
