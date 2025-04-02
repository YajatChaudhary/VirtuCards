import { Injectable } from '@nestjs/common';
import { CreateChatmessageDto } from './dto/create-chatmessage.dto';
import { UpdateChatmessageDto } from './dto/update-chatmessage.dto';

@Injectable()
export class ChatmessageService {
  create(createChatmessageDto: CreateChatmessageDto) {
    return 'This action adds a new chatmessage';
  }

  findAll() {
    return `This action returns all chatmessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatmessage`;
  }

  update(id: number, updateChatmessageDto: UpdateChatmessageDto) {
    return `This action updates a #${id} chatmessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatmessage`;
  }
}
