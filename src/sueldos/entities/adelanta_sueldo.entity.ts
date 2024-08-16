import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';

@Entity()
@Unique(['empleado']) // Asegura que no se puedan tener múltiples registros con el mismo empleado
export class AdelantoSueldo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  montolunes: number;

  @Column()
  montomartes: number;

  @Column()
  montomiercoles: number;

  @Column()
  montojueves: number;

  @Column()
  montoviernes: number;

  @Column()
  montosabado: number;

  @Column({ nullable: true })
  sueldoneto: number;

  @Column({ nullable: true })
  sueldodisponible: number;

  @ManyToOne(() => Empleado, empleado => empleado.adelantosSueldo, { eager: true })
  empleado: Empleado;
}
