import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { RegistroAsistencia } from './entities/asistencias.entity';

@Controller('asistencias')
export class AsistenciasController {
    constructor(private readonly asistenciasService: AsistenciasService) {}

    @Get()
    async findAll(): Promise<RegistroAsistencia[]> {
        return this.asistenciasService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RegistroAsistencia> {
        return this.asistenciasService.findOne(id);
    }

    @Post()
    async create(@Body() createAsistenciaDto: CreateAsistenciaDto): Promise<RegistroAsistencia> {
        return this.asistenciasService.create(createAsistenciaDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateAsistenciaDto: UpdateAsistenciaDto): Promise<RegistroAsistencia> {
        return this.asistenciasService.update(id, updateAsistenciaDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.asistenciasService.delete(id);
    }

    @Patch('clear-all')
    async clearAll(): Promise<void> {
        return this.asistenciasService.clearAll();
    }
}
