import { Responsible } from '../../entities/responsible.entity';

export default interface IChildrenOnCultRepository {
  delete(id: string): Promise<Responsible>;
  findById(id: string): Promise<Responsible>;
}
