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
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game)
  game: Game;

  @ManyToOne(() => User)
  sender: User;

  @Column()
  message: string;

  @CreateDateColumn()
  sentAt: Date;
}
