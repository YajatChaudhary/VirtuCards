import { Test, TestingModule } from '@nestjs/testing';
import { RulesetController } from './ruleset.controller';
import { RulesetService } from './ruleset.service';

describe('RulesetController', () => {
  let controller: RulesetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RulesetController],
      providers: [RulesetService],
    }).compile();

    controller = module.get<RulesetController>(RulesetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
