import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Children } from "../entities/children.entity";
import IChildrenRepository from "../repositories/children/children.repository.contract";
import { Page, PageResponse } from "../configs/database/page.model";
import { FiltersChildrenDTO } from "../dtos/children/filtersChildren.dto";
import { MappedChildrenDTO } from "../dtos/children/mappedChildren.dto";
import { CreateChildrenDTO } from "../dtos/children/createChildren.dto";
import { UpdateChildrenDTO } from "../dtos/children/updateChildren.dto";
import { Address } from "../valueObjects/address.vo";
import { ResponsibleService } from "./responsible.service";
import { ResponsiblesPropsDTO } from "src/dtos/children/responsiblesProps.dto";

@Injectable()
export class ChildrenService {
  constructor(
    @Inject("IChildrenRepository")
    private readonly childrenRepository: IChildrenRepository,
    private readonly responsibleService: ResponsibleService
  ) { }

  async create(payload: CreateChildrenDTO): Promise<Children> {

    const responsiblesProps: Array<ResponsiblesPropsDTO> = []
    
    for await (const responsible of payload.responsibles) {
      await this.responsibleService.verifyResponsible(responsible.email, responsible.phone);
      
      const newResponsible = await this.responsibleService.create({
        firstName: responsible.firstName,
        lastName: responsible.lastName,
        email: responsible.email,
        phone: responsible.phone
      });

      responsiblesProps.push({ responsibleId: newResponsible.id, type: responsible.type })
    }

    const address = payload.address ? new Address(payload.address) : undefined;

    return await this.childrenRepository.create(new Children(payload, responsiblesProps, address ));
  }

  async delete(id: string): Promise<void> {
    const children = await this.listById(id);

    await this.childrenRepository.delete(children.id);

    return;
  }

  async listById(id: string): Promise<Children> {
    const children = await this.childrenRepository.findById(id);

    if (!children) throw new HttpException(`Criança não encontrada!`, HttpStatus.NOT_FOUND);

    return children;
  }

  async listAll(page: Page, filters?: FiltersChildrenDTO): Promise<PageResponse<MappedChildrenDTO>> {

    const childrens = await this.childrenRepository.findAll(page, filters);

    const items = this.toDTO(childrens.items);

    return {
      total: childrens.total,
      items
    }
  }

  async update(id: string, data: UpdateChildrenDTO): Promise<Children> {

    const children = await this.listById(id);

    return await this.childrenRepository.update(Object.assign(children, { ...children, ...data }));
  }

  private toDTO(childrens: Children[]): MappedChildrenDTO[] {
    return childrens.map(children => {
      return {
        id: children.id,
        birthDate: children.birthDate,
        lastName: children.lastName,
        observations: children.observations,
        firstName: children.firstName,
        address: children.address,
        createdAt: children.createdAt
      }
    })
  }
}
