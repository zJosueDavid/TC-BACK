// src/asistencias/asistencias.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciasController } from './asistencias.controller';
import { AsistenciasService } from './asistencias.service';
import { RegistroAsistencia } from './entities/asistencias.entity';
import { EmpleadosModule } from 'src/empleados/empleados.module'; // Importa el módulo de empleados

@Module({
  imports: [
    TypeOrmModule.forFeature([RegistroAsistencia]),
    EmpleadosModule, // Asegúrate de importar el módulo de empleados
  ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
})
export class AsistenciasModule {}
