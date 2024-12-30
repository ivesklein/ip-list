import { Test, TestingModule } from '@nestjs/testing';
import { GetIpsController } from './get-ips.controller';
import { GetIpsService } from './get-ips.service';

describe('GetIpsController', () => {
  let controller: GetIpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetIpsController],
      providers: [GetIpsService],
    }).compile();

    controller = module.get<GetIpsController>(GetIpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
