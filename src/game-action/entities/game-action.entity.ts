import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { Player } from 'src/player/entities/player.entity';
import { Round } from 'src/round/entities/round.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class GameAction extends CommonEntity {
  @Column({
    type: 'enum',
    enum: [
      'DEAL',
      'PLAY_CARD',
      'DRAW_CARD',
      'FOLD',
      'BET',
      'RAISE',
      'CALL',
      'CHECK',
      'PASS',
      'CUSTOM',
    ],
    default: 'CUSTOM',
  })
  actionType: string;

  @Column({ type: 'jsonb', nullable: true })
  actionData: Record<string, any>; // Store action-specific data as JSON

  @Column({ nullable: true })
  message: string; // Optional message describing the action

  @CreateDateColumn()
  performedAt: Date;

  @ManyToOne(() => Player, { onDelete: 'CASCADE' })
  player: Player; // Player who performed the action

  @ManyToOne(() => Game, { onDelete: 'CASCADE' })
  game: Game;

  @ManyToOne(() => Round, { nullable: true, onDelete: 'CASCADE' })
  round: Round; // The round this action belongs to
}
