import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { Player } from 'src/player/entities/player.entity';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  // Create a standard deck of 52 cards
  async createDeck(game: Game, deckNumber: number = 1): Promise<Card[]> {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = [
      'Ace',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'Jack',
      'Queen',
      'King',
    ];

    const cards = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        const card = this.cardRepository.create({
          suit,
          rank,
          isDealt: false,
          isPlayed: false,
          deckNumber,
          game,
        });
        cards.push(card);
      }
    }

    return this.cardRepository.save(cards);
  }

  // Create multiple decks for a game
  async createDecksForGame(game: Game): Promise<Card[]> {
    const allCards = [];

    // Create the specified number of decks
    for (let i = 1; i <= game.deckCount; i++) {
      const deckCards = await this.createDeck(game, i);
      allCards.push(...deckCards);
    }

    return allCards;
  }

  // Get all cards for a game
  async getGameCards(gameId: string): Promise<Card[]> {
    return this.cardRepository.find({
      where: {
        game: { id: gameId },
      },
      relations: ['game', 'player'],
    });
  }

  // Deal a specified number of cards to a player
  async dealCardsToPlayer(
    gameId: string,
    playerId: string,
    numberOfCards: number,
  ): Promise<Card[]> {
    // Get undealt cards from the game
    const availableCards = await this.cardRepository.find({
      where: {
        game: { id: gameId },
        isDealt: false,
      },
    });

    // Shuffle the available cards
    const shuffledCards = this.shuffleCards(availableCards);

    // Take the required number of cards
    const cardsToDeal = shuffledCards.slice(0, numberOfCards);

    // Update the cards to mark them as dealt and assign to player
    for (const card of cardsToDeal) {
      card.isDealt = true;
      card.player = { id: playerId } as Player;
    }

    // Save the updated cards
    return this.cardRepository.save(cardsToDeal);
  }

  // Shuffle an array of cards (Fisher-Yates algorithm)
  shuffleCards(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Play a card (move from player's hand to played status)
  async playCard(cardId: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
    });

    if (card) {
      card.isPlayed = true;
      return this.cardRepository.save(card);
    }

    return null;
  }

  // Reset all cards in a game (for a new round)
  async resetGameCards(gameId: string): Promise<void> {
    await this.cardRepository.update(
      { game: { id: gameId } },
      { isDealt: false, isPlayed: false, player: null },
    );
  }
}
