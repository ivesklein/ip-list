import { Test, TestingModule } from '@nestjs/testing';
import { GetIpsService } from './get-ips.service';

describe('GetIpsService', () => {
  let service: GetIpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetIpsService],
    }).compile();

    service = module.get<GetIpsService>(GetIpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
