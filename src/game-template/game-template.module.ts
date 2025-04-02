import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTemplate } from './entities/game-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameTemplate])],
  providers: [],
  exports: [],
})
export class GameTemplateModule {}
