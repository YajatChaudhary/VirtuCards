import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/card/card.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private cardService: CardService,
  ) {}

  async create(createGameDto: CreateGameDto, user: User): Promise<Game> {
    const game = this.gameRepository.create({
      ...createGameDto,
      user,
      inviteCode: createGameDto.isPrivate ? this.generateInviteCode() : null,
      status: 'waiting',
    });

    const savedGame = await this.gameRepository.save(game);

    // Create decks for the game
    await this.cardService.createDecksForGame(savedGame);

    return savedGame;
  }

  private generateInviteCode(): string {
    // Generate a 6-character alphanumeric code
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find({
      where: { isPrivate: false },
      relations: ['user', 'players'],
    });
  }

  async findOne(id: string): Promise<Game> {
    return this.gameRepository.findOne({
      where: { id },
      relations: ['user', 'players', 'rules'],
    });
  }

  async findByInviteCode(inviteCode: string): Promise<Game> {
    return this.gameRepository.findOne({
      where: { inviteCode },
      relations: ['user', 'players', 'rules'],
    });
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    await this.gameRepository.update(id, updateGameDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async startGame(id: string): Promise<Game> {
    const game = await this.findOne(id);

    if (game.players.length < 2) {
      throw new Error('Cannot start game with fewer than 2 players');
    }

    // Set the game to active
    game.status = 'active';

    // Set a random player to take the first turn
    const randomIndex = Math.floor(Math.random() * game.players.length);
    game.currentTurnPlayerId = game.players[randomIndex].id;

    return this.gameRepository.save(game);
  }

  async endGame(id: string): Promise<Game> {
    const game = await this.findOne(id);
    game.status = 'finished';
    return this.gameRepository.save(game);
  }

  async cancelGame(id: string): Promise<Game> {
    const game = await this.findOne(id);
    game.status = 'cancelled';
    return this.gameRepository.save(game);
  }

  async nextTurn(id: string): Promise<Game> {
    const game = await this.findOne(id);

    // Find the index of the current player
    const currentPlayerIndex = game.players.findIndex(
      (player) => player.id === game.currentTurnPlayerId,
    );

    // Calculate the next player index (cycle through players)
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;

    // Set the next player's turn
    game.currentTurnPlayerId = game.players[nextPlayerIndex].id;

    return this.gameRepository.save(game);
  }

  async createGameRoom(): Promise<string> {
    // Generate a unique room ID for WebRTC
    return uuidv4();
  }
}
