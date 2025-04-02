import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ description: 'The ID of the user joining as a player' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID of the game the player is joining' })
  @IsUUID()
  @IsNotEmpty()
  gameId: string;

  @ApiProperty({
    description: 'Whether the player is just a spectator',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isSpectator?: boolean;

  @ApiProperty({
    description: 'The position at the virtual table',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  position?: number;

  @ApiProperty({
    description: 'The ID of the team the player is joining',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  teamId?: string;
}
