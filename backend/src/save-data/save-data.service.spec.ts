import { Test, TestingModule } from '@nestjs/testing';
import { SaveDataService } from './save-data.service';

describe('SaveDataService', () => {
  let service: SaveDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveDataService],
    }).compile();

    service = module.get<SaveDataService>(SaveDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
