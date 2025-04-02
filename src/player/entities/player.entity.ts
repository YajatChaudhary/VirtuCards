import { Card } from 'src/card/entities/card.entity';
import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Player extends CommonEntity {
  @Column({ default: false })
  isReady: boolean;

  @Column({ default: false })
  isTurn: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: false })
  isWinner: boolean;

  @Column({ nullable: true })
  position: number; // Position at the virtual table

  @Column({ default: false })
  isSpectator: boolean;

  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Game, (game) => game.players)
  game: Game;

  @ManyToOne(() => Team, (team) => team.players, { nullable: true })
  team: Team;

  @OneToMany(() => Card, (card) => card.player)
  cards: Card[];
}
