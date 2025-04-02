import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { userId, gameId, teamId, ...playerData } = createPlayerDto;

    // Fetch the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Fetch the game
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['players'],
    });
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    // Check if player count exceeds maximum
    if (
      !playerData.isSpectator &&
      game.players.filter((p) => !p.isSpectator).length >= game.maxPlayers
    ) {
      throw new BadRequestException(`Game has reached maximum player capacity`);
    }

    // Check if user is already a player in this game
    const existingPlayer = await this.playerRepository.findOne({
      where: {
        user: { id: userId },
        game: { id: gameId },
      },
    });

    if (existingPlayer) {
      throw new BadRequestException('User is already a player in this game');
    }

    // Create new player entity
    const player = this.playerRepository.create({
      ...playerData,
      user: { id: userId },
      game: { id: gameId },
    });

    // Assign to team if teamId is provided
    if (teamId) {
      const team = await this.teamRepository.findOne({ where: { id: teamId } });
      if (!team) {
        throw new NotFoundException(`Team with ID ${teamId} not found`);
      }
      player.team = team;
    }

    return this.playerRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find({
      relations: ['user', 'game', 'team', 'cards'],
    });
  }

  async findByGame(gameId: string): Promise<Player[]> {
    return this.playerRepository.find({
      where: { game: { id: gameId } },
      relations: ['user', 'team', 'cards'],
    });
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['user', 'game', 'team', 'cards'],
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const { teamId, ...updateData } = updatePlayerDto as any;
    const player = await this.findOne(id);

    // Update team if teamId is provided
    if (teamId) {
      const team = await this.teamRepository.findOne({ where: { id: teamId } });
      if (!team) {
        throw new NotFoundException(`Team with ID ${teamId} not found`);
      }
      player.team = team;
    }

    // Update other fields
    Object.assign(player, updateData);

    return this.playerRepository.save(player);
  }

  async remove(id: string): Promise<void> {
    const result = await this.playerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }

  async setReadyStatus(id: string, isReady: boolean): Promise<Player> {
    const player = await this.findOne(id);
    player.isReady = isReady;
    return this.playerRepository.save(player);
  }

  async setTurn(id: string, isTurn: boolean): Promise<Player> {
    const player = await this.findOne(id);
    player.isTurn = isTurn;
    return this.playerRepository.save(player);
  }

  async updateScore(id: string, points: number): Promise<Player> {
    const player = await this.findOne(id);
    player.score += points;
    return this.playerRepository.save(player);
  }

  async setWinner(id: string): Promise<Player> {
    const player = await this.findOne(id);
    player.isWinner = true;
    return this.playerRepository.save(player);
  }

  async resetPlayersInGame(gameId: string): Promise<void> {
    await this.playerRepository.update(
      { game: { id: gameId } },
      { isReady: false, isTurn: false, isWinner: false },
    );
  }
}
