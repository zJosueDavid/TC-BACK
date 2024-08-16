import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdelantoSueldoService } from './adelanta_sueldo.service';
import { AdelantoSueldoController } from './adelanta_sueldo.controller';
import { AdelantoSueldo } from './entities/adelanta_sueldo.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdelantoSueldo, Empleado])],
  controllers: [AdelantoSueldoController],
  providers: [AdelantoSueldoService],
})
export class AdelantoSueldoModule {}
