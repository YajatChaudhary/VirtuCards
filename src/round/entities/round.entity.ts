import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Round extends CommonEntity {
  @Column()
  roundNumber: number;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  startedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  endedAt: Date;

  @Column({ nullable: true })
  winnerId: string;

  @Column({ nullable: true })
  winningTeamId: string;

  @ManyToOne(() => Game, (game) => game.rounds, { onDelete: 'CASCADE' })
  game: Game;
}
