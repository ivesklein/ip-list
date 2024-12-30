import { Test, TestingModule } from '@nestjs/testing';
import { IpCronService } from './ip-cron.service';

describe('IpCronService', () => {
  let service: IpCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpCronService],
    }).compile();

    service = module.get<IpCronService>(IpCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
