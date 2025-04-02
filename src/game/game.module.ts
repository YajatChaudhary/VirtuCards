import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from 'src/card/card.module';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repo';
import { Game } from './entities/game.entity';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User]), CardModule],
  controllers: [GameController],
  providers: [GameService, UserRepository],
  exports: [GameService],
})
export class GameModule {}
