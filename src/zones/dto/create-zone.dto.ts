import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsObject } from 'class-validator';

export class CreateZoneDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ enum: ['Residencial', 'Comercial', 'Industrial', 'Misto'] })
    @IsString()
    type: string;

    @ApiProperty()
    @IsDateString()
    createdAt?: string;

    @ApiProperty({ description: 'GeoJSON geometry object' })
    @IsObject()
    geometry: any;
}
