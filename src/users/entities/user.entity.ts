import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    nameUser: string;
 
    @Column()
    password: string;
}
