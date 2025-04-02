import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { Player } from 'src/player/entities/player.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Card extends CommonEntity {
  @Column()
  suit: string; // Hearts, Diamonds, Clubs, Spades

  @Column()
  rank: string; // Ace, 2-10, Jack, Queen, King

  @Column({ default: false })
  isDealt: boolean;

  @Column({ default: false })
  isPlayed: boolean;

  @Column({ nullable: true })
  deckNumber: number; // To identify which deck the card belongs to in multi-deck games

  @ManyToOne(() => Game, (game) => game.cards)
  game: Game;

  @ManyToOne(() => Player, (player) => player.cards, { nullable: true })
  player: Player; // The player who currently holds this card
}
