import { Test, TestingModule } from '@nestjs/testing';
import { IpEntityController } from './ip-entity.controller';

describe('IpEntityController', () => {
  let controller: IpEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpEntityController],
    }).compile();

    controller = module.get<IpEntityController>(IpEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
