import { Game } from 'src/game/entities/game.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class RuleSet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.rules, { onDelete: 'CASCADE' })
  game: Game;

  @Column()
  name: string; // Rule name (e.g., "Play in Teams")

  @Column()
  description: string; // Rule details

  @Column({ default: true })
  isActive: boolean; // Is this rule being used in the game?
}
