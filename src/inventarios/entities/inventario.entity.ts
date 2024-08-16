import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column()
  departamento: string;

  @Column('int')
  cantidad: number;

  @Column()
  ubicacion: string;
}
