import { Test, TestingModule } from '@nestjs/testing';
import { InputDummyService } from './input-dummy.service';

describe('InputDummyService', () => {
  let service: InputDummyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InputDummyService],
    }).compile();

    service = module.get<InputDummyService>(InputDummyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
