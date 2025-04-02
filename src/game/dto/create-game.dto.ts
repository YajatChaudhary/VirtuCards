import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ description: 'Name of the game', example: 'Poker Night' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Whether the game is private',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;

  @ApiProperty({
    description: 'Number of decks to use',
    example: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  deckCount?: number;

  @ApiProperty({
    description: 'Type of card game',
    enum: ['TeenPatti', 'Sweep', 'Poker', 'Bhabhi', 'Bluff', 'Kabbo', 'Custom'],
    example: 'TeenPatti',
  })
  @IsEnum(['TeenPatti', 'Sweep', 'Poker', 'Bhabhi', 'Bluff', 'Kabbo', 'Custom'])
  @IsOptional()
  gameType?: string;

  @ApiProperty({
    description: 'Whether the game is played in teams',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isTeamGame?: boolean;

  @ApiProperty({
    description: 'Minimum number of players',
    example: 2,
    default: 2,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  minPlayers?: number;

  @ApiProperty({
    description: 'Maximum number of players',
    example: 8,
    default: 8,
  })
  @IsInt()
  @Min(2)
  @IsOptional()
  maxPlayers?: number;
}
