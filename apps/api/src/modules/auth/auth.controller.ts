import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UseGuards,
  Get,
  Req,
  Ip,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { 
  RegisterDto, 
  LoginDto, 
  RefreshTokenDto, 
  ForgotPasswordDto, 
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'ثبت‌نام کاربر جدید' })
  @ApiResponse({ status: 201, description: 'کاربر با موفقیت ثبت‌نام شد' })
  @ApiResponse({ status: 409, description: 'کاربر قبلا ثبت‌نام کرده است' })
  async register(
    @Body() dto: RegisterDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.register(dto, ip, userAgent);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ورود کاربر' })
  @ApiResponse({ status: 200, description: 'ورود موفقیت‌آمیز' })
  @ApiResponse({ status: 401, description: 'ایمیل یا رمز عبور اشتباه است' })
  async login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.login(dto, ip, userAgent);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'تمدید توکن' })
  @ApiResponse({ status: 200, description: 'توکن جدید صادر شد' })
  @ApiResponse({ status: 401, description: 'توکن نامعتبر است' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'خروج از حساب کاربری' })
  @ApiResponse({ status: 200, description: 'با موفقیت خارج شدید' })
  async logout(
    @CurrentUser('id') userId: string,
    @Body() body?: { refreshToken?: string },
  ) {
    return this.authService.logout(userId, body?.refreshToken);
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'تایید ایمیل' })
  @ApiResponse({ status: 200, description: 'ایمیل با موفقیت تایید شد' })
  @ApiResponse({ status: 400, description: 'لینک تایید نامعتبر است' })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'درخواست بازیابی رمز عبور' })
  @ApiResponse({ status: 200, description: 'لینک بازیابی ارسال شد' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'بازنشانی رمز عبور' })
  @ApiResponse({ status: 200, description: 'رمز عبور با موفقیت تغییر یافت' })
  @ApiResponse({ status: 400, description: 'لینک بازیابی نامعتبر است' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت اطلاعات کاربر فعلی' })
  @ApiResponse({ status: 200, description: 'اطلاعات کاربر' })
  async getMe(@CurrentUser() user: any) {
    return { user };
  }
}
