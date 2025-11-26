import { IsDateString, IsString } from 'class-validator';

export class CreateZoneDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsString()
    geometry: string;

    @IsDateString()
    createdAt: string;
}
