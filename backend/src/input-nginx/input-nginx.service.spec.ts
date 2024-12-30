import { Test, TestingModule } from '@nestjs/testing';
import { InputNginxService } from './input-nginx.service';

describe('InputNginxService', () => {
  let service: InputNginxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InputNginxService],
    }).compile();

    service = module.get<InputNginxService>(InputNginxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
