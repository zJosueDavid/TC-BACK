// src/asistencias/entities/asistencias.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Empleado } from 'src/empleados/entities/empleado.entity';

@Entity()
@Unique(['empleado']) // Puedes ajustar esto si tienes un campo adicional para la unicidad
export class RegistroAsistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  entrada1?: string;

  @Column({ nullable: true })
  entrada2?: string;

  @Column({ nullable: true })
  entrada3?: string;

  @Column({ nullable: true })
  entrada4?: string;

  @Column({ nullable: true })
  entrada5?: string;

  @Column({ nullable: true })
  entrada6?: string;

  @ManyToOne(() => Empleado, (empleado) => empleado.registrosAsistencia, { nullable: false })
  empleado: Empleado; // Asegúrate de que la relación esté bien definida
}
