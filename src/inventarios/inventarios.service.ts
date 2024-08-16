import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './entities/Inventario.entity';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventario.dto';
import { UpdateInventoryDto } from './dto/update-inventario.dto';

@Injectable()
export class InventariosService {
    constructor(@InjectRepository(Inventario)private usersRepository: Repository<Inventario>){}
    
    public findAll(){
        return this.usersRepository.find()
    }

    public createInventario(inventory: CreateInventoryDto){
        const newInventory = this.usersRepository.create(inventory)
        return this.usersRepository.save(newInventory)
    }

    public getInventory(id: number){
        return this.usersRepository.findOne({
            where: {
                id
            }
        })
    }

    public deleteInventory(id: number){
        return this.usersRepository.delete({id})
    }

    public updateInventory(id: number, inventory: UpdateInventoryDto){
        return this.usersRepository.update({id: id}, inventory)
    }
}