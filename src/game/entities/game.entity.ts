import { Card } from 'src/card/entities/card.entity';
import { CommonEntity } from 'src/commons/models/base.entity';
import { GameTemplate } from 'src/game-template/entities/game-template.entity';
import { Player } from 'src/player/entities/player.entity';
import { Round } from 'src/round/entities/round.entity';
import { RuleSet } from 'src/ruleset/entities/ruleset.entity';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Game extends CommonEntity {
  @Column()
  name: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ nullable: true })
  inviteCode: string;

  @Column({ default: 1 })
  deckCount: number;

  @Column({
    type: 'enum',
    enum: ['active', 'finished', 'cancelled', 'waiting'],
    default: 'waiting',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['TeenPatti', 'Sweep', 'Poker', 'Bhabhi', 'Bluff', 'Kabbo', 'Custom'],
    default: 'TeenPatti',
  })
  gameType: string;

  @Column({ nullable: true })
  currentTurnPlayerId: string;

  @Column({ nullable: true })
  webRtcRoomId: string;

  @Column({ default: false })
  isTeamGame: boolean;

  @Column({ default: 2 })
  minPlayers: number;

  @Column({ default: 8 })
  maxPlayers: number;

  @Column({ nullable: true })
  currentRoundId: string;

  @ManyToOne(() => User, (user) => user.games, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => GameTemplate, { nullable: true })
  template: GameTemplate;

  @OneToMany(() => Player, (player) => player.game)
  players: Player[];

  @OneToMany(() => RuleSet, (ruleSet) => ruleSet.game)
  rules: RuleSet[];

  @OneToMany(() => Card, (card) => card.game)
  cards: Card[];

  @OneToMany(() => Team, (team) => team.game)
  teams: Team[];

  @OneToMany(() => Round, (round) => round.game)
  rounds: Round[];
}
