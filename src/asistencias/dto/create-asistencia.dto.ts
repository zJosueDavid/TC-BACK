// src/asistencias/dto/create-registro-asistencia.dto.ts
export class CreateAsistenciaDto {
    id?: number; // Opcional, ya que es autogenerado
  
    empleadoId: number; // Identificador del empleado
  
    entrada1?: string; // Opcional, se puede omitir si no hay datos
    entrada2?: string; // Opcional
    entrada3?: string; // Opcional
    entrada4?: string; // Opcional
    entrada5?: string; // Opcional
    entrada6?: string; // Opcional
  }
  