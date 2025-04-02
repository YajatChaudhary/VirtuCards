import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerService } from './player.service';

@ApiTags('players')
@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({
    status: 201,
    description: 'The player has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - user already in game or game full.',
  })
  @ApiResponse({ status: 404, description: 'User, game, or team not found.' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'Returns all players.' })
  findAll() {
    return this.playerService.findAll();
  }

  @Get('game/:gameId')
  @ApiOperation({ summary: 'Get all players in a specific game' })
  @ApiResponse({
    status: 200,
    description: 'Returns all players in the specified game.',
  })
  findByGame(@Param('gameId') gameId: string) {
    return this.playerService.findByGame(gameId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific player by ID' })
  @ApiResponse({ status: 200, description: 'Returns the player.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a player' })
  @ApiResponse({
    status: 200,
    description: 'The player has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Player or team not found.' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a player' })
  @ApiResponse({
    status: 204,
    description: 'The player has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.playerService.remove(id);
  }

  @Put(':id/ready')
  @ApiOperation({ summary: 'Set player ready status' })
  @ApiResponse({ status: 200, description: 'Player ready status updated.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  setReadyStatus(@Param('id') id: string, @Body() body: { isReady: boolean }) {
    return this.playerService.setReadyStatus(id, body.isReady);
  }

  @Put(':id/turn')
  @ApiOperation({ summary: 'Set player turn status' })
  @ApiResponse({ status: 200, description: 'Player turn status updated.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  setTurn(@Param('id') id: string, @Body() body: { isTurn: boolean }) {
    return this.playerService.setTurn(id, body.isTurn);
  }

  @Put(':id/score')
  @ApiOperation({ summary: 'Update player score' })
  @ApiResponse({ status: 200, description: 'Player score updated.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  updateScore(@Param('id') id: string, @Body() body: { points: number }) {
    return this.playerService.updateScore(id, body.points);
  }

  @Put(':id/winner')
  @ApiOperation({ summary: 'Set player as winner' })
  @ApiResponse({ status: 200, description: 'Player set as winner.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  setWinner(@Param('id') id: string) {
    return this.playerService.setWinner(id);
  }

  @Post('game/:gameId/reset')
  @ApiOperation({ summary: 'Reset all players in a game' })
  @ApiResponse({
    status: 200,
    description: 'All players in the game have been reset.',
  })
  resetPlayersInGame(@Param('gameId') gameId: string) {
    return this.playerService.resetPlayersInGame(gameId);
  }
}
