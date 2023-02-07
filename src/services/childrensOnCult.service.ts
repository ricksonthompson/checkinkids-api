import IChildrenOnCultRepository from '../repositories/childrenOnCult/childrenOnCult.repository.contract';
import { ChildrenOnCult } from '../entities/childrenOnCult.entity';
import { UpdatePointsChildrensOnCultDTO } from '../dtos/childrensOnCult/updatePointsChildrensOnCult.dto';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ChildrensOnCultService {
  constructor(
    @Inject('IChildrenOnCultRepository')
    private readonly childrensOnCultRepository: IChildrenOnCultRepository,
  ) {}

  async registerPoints(
    cultId: string,
    childrenId: string,
    payload: UpdatePointsChildrensOnCultDTO,
  ): Promise<ChildrenOnCult> {
    const register = await this.childrensOnCultRepository.findByCultAndChildren(
      cultId,
      childrenId,
    );

    if (register) {
      throw new HttpException(
        'A criança já foi adicionada ao culto!',
        HttpStatus.CONFLICT,
      );
    }

    return await this.childrensOnCultRepository.update(
      cultId,
      childrenId,
      new ChildrenOnCult(payload),
    );
  }
}
