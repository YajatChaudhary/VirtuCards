import { Game } from 'src/game/entities/game.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'player' }) // 'admin' | 'player'
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Game, (game) => game.creator)
  games: Game[];
}
