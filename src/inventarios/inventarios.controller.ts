import { Body, Controller, Get, Param, Post, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { Inventario } from './entities/inventario.entity';
import { CreateInventoryDto } from './dto/create-inventario.dto';
import { UpdateInventoryDto } from './dto/update-inventario.dto';

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventarioService: InventariosService) {}

  @Get()
  async findAll(): Promise<Inventario[]> {
    return await this.inventarioService.findAll();
  }
  @Get(':id')
  async getEmpleado(@Param('id', ParseIntPipe) id: number): Promise<Inventario> {
    return await this.inventarioService.getInventory(id);
  }
  @Post()
  async createInventory(@Body() newInventory: CreateInventoryDto): Promise<Inventario> {
    return await this.inventarioService.createInventario(newInventory);
  }
  @Put(':id')
  async updateEmpleado(@Param('id', ParseIntPipe) id: number, @Body() inventory: UpdateInventoryDto){
    return await this.inventarioService.updateInventory(id, inventory);
  }
  @Delete(':id')
  async deleteEmpleado(@Param('id', ParseIntPipe) id: number){
    return await this.inventarioService.deleteInventory(id);
  }
}