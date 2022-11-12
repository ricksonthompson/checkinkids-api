import { FiltersChildrenDTO } from "../../dtos/children/filtersChildren.dto";
import { Page, PageResponse } from "../../configs/database/page.model";
import { Children } from "../../entities/children.entity";

export default interface IChildrenRepository {
  create(data: Children): Promise<Children>
  delete(id: string): Promise<Children>
  findAll(page: Page, filters?: FiltersChildrenDTO): Promise<PageResponse<Children>>
  findById(id: string): Promise<Children>
  update(data: Children): Promise<Children>
}
