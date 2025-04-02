import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Game, (game) => game.players)
  game: Game;

  @Column({ default: false })
  isReady: boolean; // Has the player confirmed they're ready?

  @Column({ default: false })
  isTurn: boolean; // Is it this player's turn?

  @Column({ default: 0 })
  score: number; // Game score

  @Column({ default: false })
  isWinner: boolean; // Did this player win?

  @CreateDateColumn()
  joinedAt: Date;
}
