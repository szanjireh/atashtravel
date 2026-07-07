import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'علی' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'محمدی' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: 'ali@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '09123456789', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^09[0-9]{9}$/, { message: 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد' })
  phone?: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
    { message: 'رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد' }
  )
  password: string;

  @ApiProperty({ example: 'fa', default: 'fa' })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @ApiProperty({ example: 'IRR', default: 'IRR' })
  @IsOptional()
  @IsString()
  preferredCurrency?: string;
}
