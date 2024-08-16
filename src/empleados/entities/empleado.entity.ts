// Empleado.entity.ts
import { AdelantoSueldo } from 'src/sueldos/entities/adelanta_sueldo.entity';
import { RegistroAsistencia } from 'src/asistencias/entities/asistencias.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  puesto: string;
  
  @Column()
  curp: string;

  @Column()
  rfc: string;

  @Column()
  sueldo_semanal: number;

  @OneToMany(() => RegistroAsistencia, registro => registro.empleado)
  registrosAsistencia: RegistroAsistencia[];

  @OneToMany(() => AdelantoSueldo, adelanto => adelanto.empleado)
  adelantosSueldo: AdelantoSueldo[];
}
