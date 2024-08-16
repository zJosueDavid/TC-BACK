import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdelantoSueldo } from './entities/adelanta_sueldo.entity';
import { CreateAdelantoSueldoDto } from './dto/create-adelanto-sueldo.dto';
import { UpdateAdelantoSueldoDto } from './dto/update-adelanto-sueldo.dto';
import { Empleado } from 'src/empleados/entities/empleado.entity';

@Injectable()
export class AdelantoSueldoService {
  constructor(
    @InjectRepository(AdelantoSueldo)
    private readonly adelantoSueldoRepository: Repository<AdelantoSueldo>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createAdelantoSueldoDto: CreateAdelantoSueldoDto): Promise<AdelantoSueldo> {
    const empleado = await this.empleadoRepository.findOne({ where: { id: createAdelantoSueldoDto.empleadoId } });
    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado');
    }

    // Verifica si ya existe un adelanto de sueldo para el empleado
    const existingAdelantoSueldo = await this.adelantoSueldoRepository.findOne({
      where: { empleado: empleado },
    });

    if (existingAdelantoSueldo) {
      throw new ConflictException('Ya existe un adelanto de sueldo para este empleado');
    }

    // Calcula el total solicitado
    const totalSolicitado = createAdelantoSueldoDto.montolunes + createAdelantoSueldoDto.montomartes +
                            createAdelantoSueldoDto.montomiercoles + createAdelantoSueldoDto.montojueves +
                            createAdelantoSueldoDto.montoviernes + createAdelantoSueldoDto.montosabado;

    // Verifica si el monto total solicitado excede el sueldo disponible
    if (totalSolicitado > empleado.sueldo_semanal) {
      throw new BadRequestException('El monto total solicitado excede el sueldo disponible del empleado.');
    }

    // Verifica que ningún monto sea negativo
    if (createAdelantoSueldoDto.montolunes < 0 || createAdelantoSueldoDto.montomartes < 0 ||
        createAdelantoSueldoDto.montomiercoles < 0 || createAdelantoSueldoDto.montojueves < 0 ||
        createAdelantoSueldoDto.montoviernes < 0 || createAdelantoSueldoDto.montosabado < 0) {
      throw new BadRequestException('Los montos no pueden ser negativos.');
    }

    const adelantoSueldo = this.adelantoSueldoRepository.create({
      ...createAdelantoSueldoDto,
      empleado,
      sueldoneto: empleado.sueldo_semanal,
      sueldodisponible: empleado.sueldo_semanal - totalSolicitado,
    });

    return this.adelantoSueldoRepository.save(adelantoSueldo);
  }

  async findAll(): Promise<AdelantoSueldo[]> {
    return this.adelantoSueldoRepository.find({ relations: ['empleado'] });
  }

  async findOne(id: number): Promise<AdelantoSueldo> {
    const adelantoSueldo = await this.adelantoSueldoRepository.findOne({ where: { id }, relations: ['empleado'] });
    if (!adelantoSueldo) {
      throw new NotFoundException('Adelanto de sueldo no encontrado');
    }
    adelantoSueldo.sueldoneto = adelantoSueldo.empleado.sueldo_semanal; // Asegura que el sueldoneto esté actualizado
    return adelantoSueldo;
  }

  async update(id: number, updateAdelantoSueldoDto: UpdateAdelantoSueldoDto): Promise<AdelantoSueldo> {
    const adelantoSueldo = await this.adelantoSueldoRepository.findOne({ where: { id }, relations: ['empleado'] });
    if (!adelantoSueldo) {
      throw new NotFoundException('Adelanto de sueldo no encontrado');
    }

    if (updateAdelantoSueldoDto.empleadoId && updateAdelantoSueldoDto.empleadoId !== adelantoSueldo.empleado.id) {
      const empleado = await this.empleadoRepository.findOne({ where: { id: updateAdelantoSueldoDto.empleadoId } });
      if (!empleado) {
        throw new NotFoundException('Empleado no encontrado');
      }
      adelantoSueldo.empleado = empleado;
      adelantoSueldo.sueldoneto = empleado.sueldo_semanal; // Establecer el sueldo neto basado en el empleado
    }

    // Actualizar sólo los campos que se permiten modificar
    adelantoSueldo.montolunes = updateAdelantoSueldoDto.montolunes ?? adelantoSueldo.montolunes;
    adelantoSueldo.montomartes = updateAdelantoSueldoDto.montomartes ?? adelantoSueldo.montomartes;
    adelantoSueldo.montomiercoles = updateAdelantoSueldoDto.montomiercoles ?? adelantoSueldo.montomiercoles;
    adelantoSueldo.montojueves = updateAdelantoSueldoDto.montojueves ?? adelantoSueldo.montojueves;
    adelantoSueldo.montoviernes = updateAdelantoSueldoDto.montoviernes ?? adelantoSueldo.montoviernes;
    adelantoSueldo.montosabado = updateAdelantoSueldoDto.montosabado ?? adelantoSueldo.montosabado;

    // Verificar que ningún monto sea negativo
    if (adelantoSueldo.montolunes < 0 || adelantoSueldo.montomartes < 0 ||
        adelantoSueldo.montomiercoles < 0 || adelantoSueldo.montojueves < 0 ||
        adelantoSueldo.montoviernes < 0 || adelantoSueldo.montosabado < 0) {
      throw new BadRequestException('Los montos no pueden ser negativos.');
    }

    // Recalcular el total solicitado
    const totalSolicitado = adelantoSueldo.montolunes + adelantoSueldo.montomartes +
                            adelantoSueldo.montomiercoles + adelantoSueldo.montojueves +
                            adelantoSueldo.montoviernes + adelantoSueldo.montosabado;

    // Verificar si el monto total solicitado excede el sueldo disponible
    if (totalSolicitado > adelantoSueldo.empleado.sueldo_semanal) {
      throw new BadRequestException('El monto total solicitado excede el sueldo disponible del empleado.');
    }

    // Actualizar el monto disponible
    adelantoSueldo.sueldodisponible = adelantoSueldo.sueldoneto - totalSolicitado;

    return this.adelantoSueldoRepository.save(adelantoSueldo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.adelantoSueldoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Adelanto de sueldo no encontrado');
    }
  }

  async clearAmounts(id: number): Promise<AdelantoSueldo> {
    const adelantoSueldo = await this.adelantoSueldoRepository.findOne({ where: { id }, relations: ['empleado'] });
    if (!adelantoSueldo) {
      throw new NotFoundException('Adelanto de sueldo no encontrado');
    }

    adelantoSueldo.montolunes = 0;
    adelantoSueldo.montomartes = 0;
    adelantoSueldo.montomiercoles = 0;
    adelantoSueldo.montojueves = 0;
    adelantoSueldo.montoviernes = 0;
    adelantoSueldo.montosabado = 0;

    // Recalcular el monto disponible
    adelantoSueldo.sueldodisponible = adelantoSueldo.sueldoneto;

    return this.adelantoSueldoRepository.save(adelantoSueldo);
  }

  async clearAll(): Promise<void> {
    await this.adelantoSueldoRepository
      .createQueryBuilder()
      .update(AdelantoSueldo)
      .set({
        montolunes: 0,
        montomartes: 0,
        montomiercoles: 0,
        montojueves: 0,
        montoviernes: 0,
        montosabado: 0,
        sueldodisponible: () => 'sueldoneto' // Restablecer el sueldo disponible al sueldo neto
      })
      .execute();
  }
  
}
