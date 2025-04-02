import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';

@ApiTags('Cards')
@Controller('Cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('game/:gameId')
  async getGameCards(@Param('gameId') gameId: string) {
    return this.cardService.getGameCards(gameId);
  }

  @Post('deal')
  async dealCardsToPlayer(
    @Body()
    dealData: {
      gameId: string;
      playerId: string;
      numberOfCards: number;
    },
  ) {
    const { gameId, playerId, numberOfCards } = dealData;
    return this.cardService.dealCardsToPlayer(gameId, playerId, numberOfCards);
  }

  @Put(':cardId/play')
  async playCard(@Param('cardId') cardId: string) {
    return this.cardService.playCard(cardId);
  }

  @Post('game/:gameId/reset')
  async resetGameCards(@Param('gameId') gameId: string) {
    await this.cardService.resetGameCards(gameId);
    return { message: 'Cards reset successfully' };
  }
}
