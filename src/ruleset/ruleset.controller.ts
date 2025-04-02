import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RulesetService } from './ruleset.service';
import { CreateRulesetDto } from './dto/create-ruleset.dto';
import { UpdateRulesetDto } from './dto/update-ruleset.dto';

@Controller('ruleset')
export class RulesetController {
  constructor(private readonly rulesetService: RulesetService) {}

  @Post()
  create(@Body() createRulesetDto: CreateRulesetDto) {
    return this.rulesetService.create(createRulesetDto);
  }

  @Get()
  findAll() {
    return this.rulesetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulesetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRulesetDto: UpdateRulesetDto) {
    return this.rulesetService.update(+id, updateRulesetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulesetService.remove(+id);
  }
}
