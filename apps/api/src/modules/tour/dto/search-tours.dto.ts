import { IsOptional, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchToursDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  destinationId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  minDuration?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxDuration?: number;

  @ApiProperty({ required: false, enum: ['price_asc', 'price_desc', 'duration_asc', 'duration_desc', 'popular', 'newest'] })
  @IsOptional()
  @IsEnum(['price_asc', 'price_desc', 'duration_asc', 'duration_desc', 'popular', 'newest'])
  sortBy?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number;
}
