import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleSet } from './entities/ruleset.entity';
import { RulesetController } from './ruleset.controller';
import { RulesetService } from './ruleset.service';
import { Game } from 'src/game/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuleSet, Game])],
  controllers: [RulesetController],
  providers: [RulesetService],
})
export class RulesetModule {}
