import { Injectable } from '@nestjs/common';
import { CreateRulesetDto } from './dto/create-ruleset.dto';
import { UpdateRulesetDto } from './dto/update-ruleset.dto';

@Injectable()
export class RulesetService {
  create(createRulesetDto: CreateRulesetDto) {
    return 'This action adds a new ruleset';
  }

  findAll() {
    return `This action returns all ruleset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruleset`;
  }

  update(id: number, updateRulesetDto: UpdateRulesetDto) {
    return `This action updates a #${id} ruleset`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruleset`;
  }
}
