import { Module } from '@nestjs/common';
import { RulesetService } from './ruleset.service';
import { RulesetController } from './ruleset.controller';

@Module({
  controllers: [RulesetController],
  providers: [RulesetService],
})
export class RulesetModule {}
