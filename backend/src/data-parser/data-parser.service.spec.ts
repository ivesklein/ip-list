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

  // date parser test
  // input example 27/Dec/2024:07:42:33 +0000
  // output Date object
  it('should parse date correctly', () => {
    const date = '27/Dec/2024:07:42:33 +0000';
    const parsedDate = DataParserService.parseDate(date);
    expect(parsedDate).toEqual(new Date(2024, 11, 27, 7, 42, 33));
  });

  // input example: '191.96.11.228 - - [27/Dec/2024:07:42:33 +0000] "POST /auth/login HTTP/1.1" 301 178 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  // output example: ["191.96.11.228", "27/Dec/2024:07:42:33 +0000", "POST", "/auth/login", "301", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"]
  it('should parse data correctly', () => {
    const data = '191.96.11.228 - - [27/Dec/2024:07:42:33 +0000] "POST /auth/login HTTP/1.1" 301 178 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"';
    const parsedData = DataParserService.parseData(data);
    const date = new Date(2024, 11, 27, 7, 42, 33);
    expect(parsedData).toEqual(["191.96.11.228", date, "POST", "/auth/login", "301", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"]);
  });

});
