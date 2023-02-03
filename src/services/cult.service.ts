import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cult } from '../entities/cult.entity';
import ICultRepository from '../repositories/cult/cult.repository.contract';
import { Page, PageResponse } from '../configs/database/page.model';
import { CreateCultDTO } from '../dtos/cult/createCult.dto';
import { MappedCultDTO } from '../dtos/cult/mappedCult.dto';
import { UpdateCultDTO } from '../dtos/cult/updateCult.dto';
import { AddChildrensOnCultDTO } from '../dtos/cult/addChildrensOnCult.dto';
import { Children } from '../entities/children.entity';
import { ChildrenService } from './children.service';
import { UpdatePointsChildrensOnCultDTO } from '../dtos/childrensOnCult/updatePointsChildrensOnCult.dto';
import { ChildrensOnCultService } from './childrensOnCult.service';
import { EShiftCult, ETimeCult } from 'src/utils/ETypes';

@Injectable()
export class CultService {
  constructor(
    @Inject('ICultRepository')
    private readonly cultRepository: ICultRepository,
    private readonly childrenService: ChildrenService,
    private readonly childrensOnCultService: ChildrensOnCultService,
  ) {}

  // TODO: Método para iniciar e finalizar culto
  // async updateStatus(status: EStatusCult): Promise<MappedCultDTO> {}

  // TODO: Método para pesquisar por data

  async create(payload: CreateCultDTO): Promise<Cult> {
    // TODO: Não permitir criar cultos com datas já passadas

    // TODO: Criar cultos somente nos domingos

    // TODO: Criar apenas 1 culto matinal e um culto noturno por domingo

    const time =
      payload.shift === EShiftCult.MORNING
        ? ETimeCult.MORNING
        : ETimeCult.NIGHT;

    return await this.cultRepository.create(
      new Cult({
        ...payload,
        time,
      }),
    );
  }

  async registerPointsChildren(
    cultId: string,
    childrenId: string,
    payload: UpdatePointsChildrensOnCultDTO,
  ): Promise<MappedCultDTO> {
    const cult = await this.listById(cultId);

    await this.childrensOnCultService.registerPoints(
      cult.id,
      childrenId,
      payload,
    );

    const updatedCult = await this.verify(cult.id);

    return this.mapperOne(updatedCult);
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

  private async verify(id: string): Promise<Cult> {
    const cult = await this.cultRepository.findById(id);

    if (!cult)
      throw new HttpException('Culto não encontrado!', HttpStatus.NOT_FOUND);

    return cult;
  }

  private mapperMany(cults: Cult[]): MappedCultDTO[] {
    return cults.map((cult) => {
      return {
        id: cult.id,
        title: cult.title,
        shift: cult.shift,
        date: cult.date,
        time: cult.time,
        status: cult.status,
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
              isInvited: item.isInvited,
              updatedAt: item.updatedAt,
            }))
          : null,
        createdAt: cult.createdAt,
      };
    });
  }

  private mapperOne(cult: Cult): MappedCultDTO {
    return {
      id: cult.id,
      title: cult.title,
      shift: cult.shift,
      date: cult.date,
      time: cult.time,
      status: cult.status,
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
            isInvited: item.isInvited,
            updatedAt: item.updatedAt,
          }))
        : null,
      createdAt: cult.createdAt,
    };
  }
}
