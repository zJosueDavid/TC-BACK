import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroAsistencia } from './entities/asistencias.entity';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Empleado } from 'src/empleados/entities/empleado.entity';

@Injectable()
export class AsistenciasService {
    constructor(
        @InjectRepository(RegistroAsistencia)
        private readonly registroAsistenciaRepository: Repository<RegistroAsistencia>,
        @InjectRepository(Empleado)
        private readonly empleadoRepository: Repository<Empleado>,
    ) {}

    async findAll(): Promise<RegistroAsistencia[]> {
        return this.registroAsistenciaRepository.find({
            relations: ['empleado'],
        });
    }

    async findOne(id: number): Promise<RegistroAsistencia> {
        return this.registroAsistenciaRepository.findOne({
            where: { id },
            relations: ['empleado'],
        });
    }

    async create(createAsistenciaDto: CreateAsistenciaDto): Promise<RegistroAsistencia> {
        const empleado = await this.empleadoRepository.findOneBy({ id: createAsistenciaDto.empleadoId });
        if (!empleado) {
            throw new Error('Empleado not found');
        }

        const existingRegistro = await this.registroAsistenciaRepository.findOneBy({ empleado });
        if (existingRegistro) {
            throw new ConflictException('Registro de asistencia ya existe para este empleado');
        }

        const newRegistroAsistencia = this.registroAsistenciaRepository.create({
            ...createAsistenciaDto,
            empleado,
        });

        return this.registroAsistenciaRepository.save(newRegistroAsistencia);
    }

    async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto): Promise<RegistroAsistencia> {
        const existingRegistro = await this.registroAsistenciaRepository.findOne({
            where: { id },
            relations: ['empleado'],
        });
        if (!existingRegistro) {
            throw new NotFoundException('Registro de asistencia no encontrado');
        }

        if (updateAsistenciaDto.empleadoId) {
            const empleado = await this.empleadoRepository.findOneBy({ id: updateAsistenciaDto.empleadoId });
            if (!empleado) {
                throw new Error('Empleado not found');
            }
            existingRegistro.empleado = empleado;
        }

        const updatedRegistroAsistencia = this.registroAsistenciaRepository.merge(existingRegistro, updateAsistenciaDto);

        await this.registroAsistenciaRepository.save(updatedRegistroAsistencia);

        return this.registroAsistenciaRepository.findOne({
            where: { id: updatedRegistroAsistencia.id },
            relations: ['empleado'],
        });
    }

    async delete(id: number): Promise<void> {
        const result = await this.registroAsistenciaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Registro de asistencia no encontrado');
        }
    }

    async clearAll(): Promise<void> {
        const asistencias = await this.registroAsistenciaRepository.find();
        for (const asistencia of asistencias) {
            asistencia.entrada1 = '';
            asistencia.entrada2 = '';
            asistencia.entrada3 = '';
            asistencia.entrada4 = '';
            asistencia.entrada5 = '';
            asistencia.entrada6 = '';
            await this.registroAsistenciaRepository.save(asistencia);
        }
    }
}
