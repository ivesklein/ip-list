import { Test, TestingModule } from '@nestjs/testing';
import { AbuseipdbApiService } from './abuseipdb-api.service';

describe('AbuseipdbApiService', () => {
  let service: AbuseipdbApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbuseipdbApiService],
    }).compile();

    service = module.get<AbuseipdbApiService>(AbuseipdbApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
