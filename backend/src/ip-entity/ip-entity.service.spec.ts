import { Test, TestingModule } from '@nestjs/testing';
import { IpEntityService } from './ip-entity.service';

describe('IpEntityService', () => {
  let service: IpEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpEntityService],
    }).compile();

    service = module.get<IpEntityService>(IpEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
