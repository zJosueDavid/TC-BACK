import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { InventariosController } from './inventarios.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([
        Inventario,
      
    ])
  ],
  providers: [
    InventariosService
  ],
  exports: [
    TypeOrmModule,
    InventariosService,
  ],
  controllers: [
    InventariosController
  ]
})
export class InventariosModule {}