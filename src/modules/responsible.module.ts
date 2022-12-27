import { Module } from '@nestjs/common';
import { ResponsibleRepository } from '../repositories/responsible/responsible.repository';
import { ResponsibleService } from '../services/responsible.service';

@Module({
  providers: [
    ResponsibleService,
    {
      provide: 'IResponsibleRepository',
      useClass: ResponsibleRepository,
    },
  ],
  exports: [ResponsibleService],
})
export class ResponsibleModule {}
