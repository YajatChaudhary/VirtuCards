import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/commons/logger/logger.service';
import { Roles } from 'src/roles/entities/roles.entity';
import { RolesRepository } from 'src/roles/repository/roles.repo';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { UserRolesRepository } from 'src/user-roles/repository/user-roles.repo';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Roles, UserRole])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    RolesRepository,
    UserRolesRepository,
    LoggerService,
  ],
})
export class UserModule {}
