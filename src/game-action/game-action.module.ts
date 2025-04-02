import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameAction } from './entities/game-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameAction])],
  providers: [],
  exports: [],
})
export class GameActionModule {} 