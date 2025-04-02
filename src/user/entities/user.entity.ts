import { CommonEntity } from 'src/commons/models/base.entity';
import { Game } from 'src/game/entities/game.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Game, (game) => game.user)
  games: Game[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
