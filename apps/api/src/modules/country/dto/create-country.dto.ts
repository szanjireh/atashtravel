import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'TR' })
  @IsString()
  @Length(2, 2)
  iso2!: string;

  @ApiProperty({ example: 'TUR' })
  @IsString()
  @Length(3, 3)
  iso3!: string;

  @ApiPropertyOptional({ example: '+90' })
  @IsOptional()
  @IsString()
  phoneCode?: string;
}
