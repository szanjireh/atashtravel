import { IsString, IsEnum, IsDateString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTravelerDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  middleName?: string;

  @ApiProperty({ enum: ['adult', 'child', 'infant'] })
  @IsEnum(['adult', 'child', 'infant'])
  type: string;

  @ApiProperty({ enum: ['male', 'female', 'other'] })
  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @ApiProperty()
  @IsDateString()
  birthDate: string;

  @ApiProperty()
  @IsString()
  nationality: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nationalId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  passportExpiry?: string;
}

export class UpdateTravelerDto extends CreateTravelerDto {}
