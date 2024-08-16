import { Test, TestingModule } from '@nestjs/testing';
import { InventariosController } from './inventarios.controller';

describe('InventariosController', () => {
  let controller: InventariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventariosController],
    }).compile();

    controller = module.get<InventariosController>(InventariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});