// src/empleado/empleado.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
// import { Controller, Get} from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
// import internal from 'stream';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller('empleados')

export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadosService) {}

  @Get()
  async findAll(): Promise<Empleado[]> {
    return await this.empleadoService.findAll();
  }

  @Get(':id')
  async getEmpleado(@Param('id', ParseIntPipe) id: number): Promise<Empleado> {
    return await this.empleadoService.getEmpleado(id);
  }

  @Post()
  async createEmpleado(@Body() newEmpleado: CreateEmpleadoDto): Promise<Empleado> {
    console.log(newEmpleado);
    return await this.empleadoService.createEmpleado(newEmpleado);
  }

  @Put(':id')
  async updateEmpleado(@Param('id', ParseIntPipe) id: number, @Body() empleado: UpdateEmpleadoDto){
    return await this.empleadoService.updateEmpleado(id, empleado);
  }

  @Delete(':id')
  async deleteEmpleado(@Param('id', ParseIntPipe) id: number){
    return await this.empleadoService.deleteEmpleado(id);
  }
}