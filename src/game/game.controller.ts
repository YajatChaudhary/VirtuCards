import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repo';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async create(
    @Body() createGameDto: CreateGameDto,
    @Body('userId') userId: string,
  ) {
    const user = await this.userRepository.findOneById(userId);
    return this.gameService.create(createGameDto, user);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }
}
