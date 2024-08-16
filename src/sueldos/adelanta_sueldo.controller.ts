import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { AdelantoSueldoService } from './adelanta_sueldo.service';
import { CreateAdelantoSueldoDto } from './dto/create-adelanto-sueldo.dto';
import { UpdateAdelantoSueldoDto } from './dto/update-adelanto-sueldo.dto';

@Controller('ads')
export class AdelantoSueldoController {
  constructor(private readonly adelantoSueldoService: AdelantoSueldoService) {}

  @Post()
  create(@Body() createAdelantoSueldoDto: CreateAdelantoSueldoDto) {
    return this.adelantoSueldoService.create(createAdelantoSueldoDto);
  }

  @Get()
  findAll() {
    return this.adelantoSueldoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adelantoSueldoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdelantoSueldoDto: UpdateAdelantoSueldoDto) {
    return this.adelantoSueldoService.update(+id, updateAdelantoSueldoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adelantoSueldoService.remove(+id);
  }

  @Patch('clear-all')
  async clearAll(): Promise<void> {
    return this.adelantoSueldoService.clearAll();
  }

  @Patch(':id/clear-amounts')
  clearAmounts(@Param('id') id: string) {
    return this.adelantoSueldoService.clearAmounts(+id);
  }
}
