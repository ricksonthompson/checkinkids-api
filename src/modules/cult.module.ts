import { Module } from '@nestjs/common';
import { CultService } from '../services/cult.service';
import { CultRepository } from '../repositories/cult/cult.repository';
import { CultController } from '../controllers/cult.controller';
import { ChildrenModule } from './children.module';

@Module({
  imports: [ChildrenModule],
  controllers: [CultController],
  providers: [
    CultService,
    {
      provide: 'ICultRepository',
      useClass: CultRepository,
    },
  ],
  exports: [CultService],
})
export class CultModule {}
