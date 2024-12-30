import { Test, TestingModule } from '@nestjs/testing';
import { DataParserService } from './data-parser.service';

describe('DataParserService', () => {
  let service: DataParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataParserService],
    }).compile();

    service = module.get<DataParserService>(DataParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
