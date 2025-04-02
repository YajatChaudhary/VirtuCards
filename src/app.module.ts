import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestContextModule } from 'nestjs-request-context';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditModule } from './audit/audit.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { ChatmessageModule } from './chatmessage/chatmessage.module';
import { ClickHouseModule } from './commons/clickhouse/clickhouse.module';
import { SseModule } from './commons/sse/sse.module';
import { WebSocketModule } from './commons/websocket/websocket.module';
import { AppDataSource } from './db/database.config';
import { GameActionModule } from './game-action/game-action.module';
import { GameTemplateModule } from './game-template/game-template.module';
import { GameModule } from './game/game.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PlayerModule } from './player/player.module';
import { RoleModule } from './roles/roles.module';
import { RoundModule } from './round/round.module';
import { RulesetModule } from './ruleset/ruleset.module';
import { TeamModule } from './team/team.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RequestContextModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.register({}),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    WebSocketModule,
    ClickHouseModule,
    AuthModule,
    PermissionsModule,
    RoleModule,
    UserRolesModule,
    AuditModule,
    SseModule,
    UserModule,
    GameModule,
    PlayerModule,
    RulesetModule,
    ChatmessageModule,
    CardModule,
    TeamModule,
    RoundModule,
    GameActionModule,
    GameTemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
