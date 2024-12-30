import { Test, TestingModule } from '@nestjs/testing';
import { IpPipeService } from './ip-pipe.service';

describe('IpPipeService', () => {
  let service: IpPipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpPipeService],
    }).compile();

    service = module.get<IpPipeService>(IpPipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
