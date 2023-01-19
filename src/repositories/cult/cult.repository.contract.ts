import { Page, PageResponse } from '../../configs/database/page.model';
import { Cult } from '../../entities/cult.entity';

export default interface ICultRepository {
  create(data: Cult): Promise<Cult>;
  delete(id: string): Promise<Cult>;
  findAll(page: Page, filters?: any): Promise<PageResponse<Cult>>;
  findById(id: string): Promise<Cult>;
  update(data: Cult): Promise<Cult>;
  addChildrensOnCult(id: string, childrensIds: string[]): Promise<Cult>;
}
