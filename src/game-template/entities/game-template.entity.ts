import { CommonEntity } from 'src/commons/models/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class GameTemplate extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['TeenPatti', 'Sweep', 'Poker', 'Bhabhi', 'Bluff', 'Kabbo', 'Custom'],
    default: 'TeenPatti',
  })
  gameType: string;

  @Column({ default: 1 })
  deckCount: number;

  @Column({ default: false })
  isTeamGame: boolean;

  @Column({ default: 2 })
  minPlayers: number;

  @Column({ default: 8 })
  maxPlayers: number;

  @Column({ type: 'jsonb' })
  rules: Record<string, any>; // JSON object containing game-specific rules

  @Column({ default: 0 })
  usageCount: number; // Track how many times this template has been used

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User; // The user who created this template
}
