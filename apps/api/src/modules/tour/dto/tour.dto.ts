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
  destinationId: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  duration: number;

  @ApiProperty({ enum: ['days', 'hours'] })
  @IsString()
  durationType: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  priceAdult: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  priceChild: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  priceInfant: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  discount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  included?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excluded?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  meetingPoint?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cancellationPolicy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  minParticipants?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  maxParticipants?: number;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class UpdateTourDto extends CreateTourDto {}
