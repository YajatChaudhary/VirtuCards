import { Test, TestingModule } from '@nestjs/testing';
import { ChatmessageController } from './chatmessage.controller';
import { ChatmessageService } from './chatmessage.service';

describe('ChatmessageController', () => {
  let controller: ChatmessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatmessageController],
      providers: [ChatmessageService],
    }).compile();

    controller = module.get<ChatmessageController>(ChatmessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
