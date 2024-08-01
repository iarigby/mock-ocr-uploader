import { Test, TestingModule } from '@nestjs/testing';
import { VersionController } from './version.controller';

describe('VersionController', () => {
  let controller: VersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionController],
    }).compile();

    controller = module.get<VersionController>(VersionController);
  });

  it('should return a dummy version', () => {
    expect(controller.getVersion().version).toBe('0.1.0');
  });
});
