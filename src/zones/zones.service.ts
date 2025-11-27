import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly repository: Repository<Zone>
  ) { }

  create(dto: CreateZoneDto) {
    const geometry = typeof dto.geometry === 'object' ? JSON.stringify(dto.geometry) : dto.geometry;
    const createdAt = dto.createdAt ?? new Date().toISOString();

    const zone = this.repository.create({
      ...dto,
      geometry,
      createdAt,
    });

    return this.repository.save(zone).then(saved => ({
      ...saved,
      geometry: this.safeParseJSON(saved.geometry),
    }));
  }

  async findAll() {
    const zones = await this.repository.find();

    return zones.map((z) => ({
      ...z,
      geometry: this.safeParseJSON(z.geometry),
    }));
  }

  async findOne(id: string) {
    const zone = await this.repository.findOneBy({ id });
    if (!zone) return null;

    return {
      ...zone,
      geometry: this.safeParseJSON(zone.geometry),
    };
  }

  async update(id: string, dto: UpdateZoneDto) {
    const zone = await this.repository.findOneBy({ id });
    if (!zone) {
      return null;
    }

    const geometry = dto.geometry && typeof dto.geometry === 'object' ? JSON.stringify(dto.geometry) : zone.geometry;

    this.repository.merge(zone, {
      ...dto,
      geometry,
    });

    return this.repository.save({
      ...zone,
      geometry: this.safeParseJSON(zone.geometry),
    });
  }

  async remove(id: string) {
    const zone = await this.repository.findOneBy({ id });
    if (!zone) {
      return null;
    }

    return this.repository.remove(zone);
  }

  private safeParseJSON(value: string) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
}
