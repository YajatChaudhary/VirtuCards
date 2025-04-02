import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatmessageService } from './chatmessage.service';
import { CreateChatmessageDto } from './dto/create-chatmessage.dto';
import { UpdateChatmessageDto } from './dto/update-chatmessage.dto';

@Controller('chatmessage')
export class ChatmessageController {
  constructor(private readonly chatmessageService: ChatmessageService) {}

  @Post()
  create(@Body() createChatmessageDto: CreateChatmessageDto) {
    return this.chatmessageService.create(createChatmessageDto);
  }

  @Get()
  findAll() {
    return this.chatmessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatmessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatmessageDto: UpdateChatmessageDto) {
    return this.chatmessageService.update(+id, updateChatmessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatmessageService.remove(+id);
  }
}
