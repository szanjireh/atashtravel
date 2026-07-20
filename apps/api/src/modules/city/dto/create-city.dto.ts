import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    description: 'شناسه کشور',
  })
  @IsUUID()
  countryId!: string;

  @ApiProperty({
    example: 'Istanbul',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 41.0082,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({
    example: 28.9784,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}