import { Module } from '@nestjs/common';
import { ChatmessageService } from './chatmessage.service';
import { ChatmessageController } from './chatmessage.controller';

@Module({
  controllers: [ChatmessageController],
  providers: [ChatmessageService],
})
export class ChatmessageModule {}
