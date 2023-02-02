import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Responsible } from '../entities/responsible.entity';
import IResponsibleRepository from '../repositories/responsible/responsible.repository.contract';
import { Page, PageResponse } from '../configs/database/page.model';
import { FiltersResponsibleDTO } from '../dtos/responsible/filtersResponsible.dto';
import { MappedResponsibleDTO } from '../dtos/responsible/mappedResponsible.dto';
import { CreateResponsibleDTO } from '../dtos/responsible/createResponsible.dto';
import { UpdateResponsibleDTO } from '../dtos/responsible/updateResponsible.dto';

@Injectable()
export class ResponsibleService {
  constructor(
    @Inject('IResponsibleRepository')
    private readonly responsibleRepository: IResponsibleRepository,
  ) {}

  async create(payload: CreateResponsibleDTO): Promise<Responsible> {
    await this.verifyResponsible(payload.email, payload.phone);

    return await this.responsibleRepository.create(new Responsible(payload));
  }

  async delete(id: string): Promise<void> {
    const responsible = await this.listById(id);

    await this.responsibleRepository.delete(responsible.id);

    return;
  }

  async listById(id: string): Promise<Responsible> {
    const responsible = await this.responsibleRepository.findById(id);

    if (!responsible)
      throw new HttpException(`Criança não encontrada!`, HttpStatus.NOT_FOUND);

    return responsible;
  }

  async listAll(
    page: Page,
    filters?: FiltersResponsibleDTO,
  ): Promise<PageResponse<MappedResponsibleDTO>> {
    const responsibles = await this.responsibleRepository.findAll(
      page,
      filters,
    );

    const items = this.toDTO(responsibles.items);

    return {
      total: responsibles.total,
      items,
    };
  }

  async update(id: string, data: UpdateResponsibleDTO): Promise<Responsible> {
    const responsible = await this.listById(id);

    return await this.responsibleRepository.update(
      Object.assign(responsible, { ...responsible, ...data }),
    );
  }

  async verifyResponsible(email: string, phone: string): Promise<void> {
    const responsibleWithTheSameEmail =
      await this.responsibleRepository.findByEmail(email);

    if (responsibleWithTheSameEmail)
      throw new HttpException(
        `O e-mail ${email} já está em uso!`,
        HttpStatus.CONFLICT,
      );

    const responsibleWithTheSamePhone =
      await this.responsibleRepository.findByPhone(email);

    if (responsibleWithTheSamePhone)
      throw new HttpException(
        `O telefone ${phone} já está em uso!`,
        HttpStatus.CONFLICT,
      );
  }

  private toDTO(responsibles: Responsible[]): MappedResponsibleDTO[] {
    return responsibles.map((responsible) => {
      return {
        id: responsible.id,
        name: responsible.name,
        email: responsible.email,
        phone: responsible.phone,
        createdAt: responsible.createdAt,
      };
    });
  }
}
