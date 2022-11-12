import { FiltersResponsibleDTO } from "../../dtos/responsible/filtersResponsible.dto";
import { Page, PageResponse } from "../../configs/database/page.model";
import { Responsible } from "../../entities/responsible.entity";

export default interface IResponsibleRepository {
  create(data: Responsible): Promise<Responsible>
  delete(id: string): Promise<Responsible>
  findAll(page: Page, filters?: FiltersResponsibleDTO): Promise<PageResponse<Responsible>>
  findById(id: string): Promise<Responsible>
  findByEmail(email: string): Promise<Responsible>
  findByPhone(phone: string): Promise<Responsible>
  update(data: Responsible): Promise<Responsible>
}
