import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
// import { EmpleadosModule } from './empleados.module';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadosService {
    constructor(@InjectRepository(Empleado)private usersRepository: Repository<Empleado>){}

    public findAll(){
        return this.usersRepository.find()
    }

    public createEmpleado(empleado: CreateEmpleadoDto){
        const newEmpleado = this.usersRepository.create(empleado)
        return this.usersRepository.save(newEmpleado)
    }

    public getEmpleado(id: number){
        return this.usersRepository.findOne({
            where: {
                id
            }
        })
    }

    public deleteEmpleado(id: number){
        return this.usersRepository.delete({id})
    }

    public updateEmpleado(id: number, empleado: UpdateEmpleadoDto){
        return this.usersRepository.update({id: id}, empleado)
    }
}