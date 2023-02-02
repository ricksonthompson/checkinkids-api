import { Module } from '@nestjs/common';
import { ChildrensOnCultService } from '../services/childrensOnCult.service';
import { ChildrenModule } from './children.module';
import { ChildrenOnCultRepository } from '../repositories/childrenOnCult/childrenOnCult.repository';

@Module({
  imports: [ChildrenModule],
  providers: [
    ChildrensOnCultService,
    {
      provide: 'IChildrenOnCultRepository',
      useClass: ChildrenOnCultRepository,
    },
  ],
  exports: [ChildrensOnCultService],
})
export class ChildrensOnCultModule {}
