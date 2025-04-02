import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ChatMessage extends CommonEntity {
  @Column()
  message: string;

  @CreateDateColumn()
  sentAt: Date;

  @ManyToOne(() => Game)
  game: Game;

  @ManyToOne(() => User)
  sender: User;
}
