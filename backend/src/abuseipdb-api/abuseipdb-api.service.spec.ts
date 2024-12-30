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

  it('should get abuse data', async () => {
    const ip = '118.25.6.39';
    const abuseData = await AbuseipdbApiService.getAbuseData(ip);
    expect(abuseData).toHaveProperty('ip');
    expect(abuseData).toHaveProperty('abuseConfidenceScore');
    expect(abuseData).toHaveProperty('country');
    expect(abuseData).toHaveProperty('usageType');
  });
});
