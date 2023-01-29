import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChildrenModule } from './children.module';
import { ApiModule } from './api.module';
import { RepositoryModule } from './repository.module';
import { CultModule } from './cult.module';
import { ChildrensOnCultModule } from './childrensOnCult.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    RepositoryModule,
    ApiModule,
    ChildrenModule,
    CultModule,
    ChildrensOnCultModule,
  ],
})
export class AppModule {}
