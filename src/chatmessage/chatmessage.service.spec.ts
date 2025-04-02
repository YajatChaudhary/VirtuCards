import { Test, TestingModule } from '@nestjs/testing';
import { ChatmessageService } from './chatmessage.service';

describe('ChatmessageService', () => {
  let service: ChatmessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatmessageService],
    }).compile();

    service = module.get<ChatmessageService>(ChatmessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
