import { IsString, IsOptional, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}

export class UpdateAddressDto extends CreateAddressDto {}
