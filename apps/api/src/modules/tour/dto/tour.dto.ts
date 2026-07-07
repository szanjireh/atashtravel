import { IsString, IsOptional, IsNumber, IsArray, IsDateString, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTourDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty()
  @IsString()
  countryId: string;

  @ApiProperty()
  @IsString()
  cityId: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  durationDays: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  durationNights: number;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}

export class UpdateTourDto extends CreateTourDto {}
