import { Player } from 'src/player/entities/player.entity';
import { RuleSet } from 'src/ruleset/entities/ruleset.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isPrivate: boolean; // True if game is invite-only

  @Column({ nullable: true })
  inviteCode: string; // Code for private games

  @Column({ default: 1 })
  deckCount: number; // Number of decks

  @Column({
    type: 'enum',
    enum: ['active', 'finished', 'cancelled'],
    default: 'active',
  })
  status: string; // Game status

  @ManyToOne(() => User, (user) => user.games)
  creator: User; // Who created the game

  @OneToMany(() => Player, (player) => player.game)
  players: Player[];

  @OneToMany(() => RuleSet, (ruleSet) => ruleSet.game)
  rules: RuleSet[];

  @CreateDateColumn()
  createdAt: Date;
}
