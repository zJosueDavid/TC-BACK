// src/sueldos/dto/update-adelanto-sueldo.dto.ts
export class UpdateAdelantoSueldoDto {
    montolunes: number;
    montomartes: number;
    montomiercoles: number;
    montojueves: number;
    montoviernes: number;
    montosabado: number;
    sueldoneto?: number; // Opcional si se quiere permitir su actualización
    sueldodisponible?: number; // Opcional si se quiere permitir su actualización
    empleadoId: number; // Necesario para actualizar el empleado asociado
  }
  