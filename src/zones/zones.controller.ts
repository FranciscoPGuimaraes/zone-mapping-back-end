import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @Get()
  findAll() {
    return this.zonesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const zone = await this.zonesService.findOne(id);
    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }
    return zone;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    const zone = await this.zonesService.update(id, updateZoneDto);
    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }
    return zone;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const zone = await this.zonesService.remove(id);
    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }
  }
}
