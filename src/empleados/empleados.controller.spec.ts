import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoController } from './empleados.controller';

describe('EmpleadoController', () => {
  let controller: EmpleadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadoController],
    }).compile();

    controller = module.get<EmpleadoController>(EmpleadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
