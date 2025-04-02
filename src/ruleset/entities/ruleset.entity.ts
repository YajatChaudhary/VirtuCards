import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RuleSet extends CommonEntity {
  @Column()
  name: string; // Rule name (e.g., "Play in Teams")

  @Column()
  description: string; // Rule details

  @ManyToOne(() => Game, (game) => game.rules, { onDelete: 'CASCADE' })
  game: Game;
}
