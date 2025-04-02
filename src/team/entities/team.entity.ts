import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { Player } from 'src/player/entities/player.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Team extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => Game, (game) => game.teams, { onDelete: 'CASCADE' })
  game: Game;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
