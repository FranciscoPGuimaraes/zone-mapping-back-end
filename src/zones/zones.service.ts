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
    private readonly repository: Repository<Zone>) { }

  create(dto: CreateZoneDto) {
    const zone = this.repository.create(dto);
    return this.repository.save(zone);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateZoneDto) {
    const zone = await this.repository.findOneBy({ id });
    if (!zone) {
      return null;
    }

    this.repository.merge(zone, dto);
    return this.repository.save(zone);
  }

  async remove(id: string) {
    const zone = await this.repository.findOneBy({ id });
    if (!zone) {
      return null;
    }

    return this.repository.remove(zone);
  }
}
