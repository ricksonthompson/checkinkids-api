import { ChildrenOnCult } from '../../entities/childrenOnCult.entity';

export default interface IChildrenOnCultRepository {
  update(
    cultId: string,
    childrenId: string,
    data: ChildrenOnCult,
  ): Promise<ChildrenOnCult>;
  findByCultAndChildren(
    cultId: string,
    childrenId: string,
  ): Promise<ChildrenOnCult>;
}
