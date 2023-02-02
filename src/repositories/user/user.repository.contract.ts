import { FiltersUserDTO } from '../../dtos/user/filtersUser.dto';
import { Page, PageResponse } from '../../configs/database/page.model';
import { User } from '../../entities/user.entity';

export default interface IUserRepository {
  create(data: User): Promise<User>;
  delete(id: string): Promise<User>;
  findAll(page: Page, filters?: FiltersUserDTO): Promise<PageResponse<User>>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(data: User): Promise<User>;
}
