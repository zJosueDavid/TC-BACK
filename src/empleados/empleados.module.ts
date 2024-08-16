import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { EmpleadoController } from './empleados.controller';
import { RegistroAsistencia } from 'src/asistencias/entities/asistencias.entity';
import { AdelantoSueldo } from 'src/sueldos/entities/adelanta_sueldo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Empleado,
        RegistroAsistencia,
        AdelantoSueldo
    ])
  ],
  providers: [
    EmpleadosService
  ],
  exports: [
    TypeOrmModule,
    EmpleadosService,
  ],
  controllers: [
    EmpleadoController
  ]
})
export class EmpleadosModule {}
