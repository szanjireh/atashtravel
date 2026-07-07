import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { 
  UpdateProfileDto, 
  ChangePasswordDto, 
  CreateAddressDto, 
  UpdateAddressDto,
  CreateTravelerDto,
  UpdateTravelerDto,
} from './dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'دریافت پروفایل کاربر' })
  @ApiResponse({ status: 200, description: 'پروفایل کاربر' })
  async getProfile(@CurrentUser('id') userId: string) {
    return this.userService.getProfile(userId);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'بروزرسانی پروفایل' })
  @ApiResponse({ status: 200, description: 'پروفایل بروز شد' })
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(userId, dto);
  }

  @Post('password')
  @ApiOperation({ summary: 'تغییر رمز عبور' })
  @ApiResponse({ status: 200, description: 'رمز عبور تغییر یافت' })
  async changePassword(
    @CurrentUser('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(userId, dto);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'آپلود تصویر پروفایل' })
  @ApiResponse({ status: 200, description: 'تصویر آپلود شد' })
  async uploadAvatar(
    @CurrentUser('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /image\/(jpeg|jpg|png|webp)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // TODO: Upload to MinIO and update user
    return { message: 'تصویر آپلود شد', filename: file.originalname };
  }

  // Addresses
  @Get('addresses')
  @ApiOperation({ summary: 'دریافت آدرس‌ها' })
  async getAddresses(@CurrentUser('id') userId: string) {
    return this.userService.getAddresses(userId);
  }

  @Post('addresses')
  @ApiOperation({ summary: 'افزودن آدرس جدید' })
  async createAddress(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateAddressDto,
  ) {
    return this.userService.createAddress(userId, dto);
  }

  @Patch('addresses/:id')
  @ApiOperation({ summary: 'بروزرسانی آدرس' })
  async updateAddress(
    @CurrentUser('id') userId: string,
    @Param('id') addressId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.userService.updateAddress(userId, addressId, dto);
  }

  @Delete('addresses/:id')
  @ApiOperation({ summary: 'حذف آدرس' })
  async deleteAddress(
    @CurrentUser('id') userId: string,
    @Param('id') addressId: string,
  ) {
    return this.userService.deleteAddress(userId, addressId);
  }

  // Travelers
  @Get('travelers')
  @ApiOperation({ summary: 'دریافت مسافران' })
  async getTravelers(@CurrentUser('id') userId: string) {
    return this.userService.getTravelers(userId);
  }

  @Post('travelers')
  @ApiOperation({ summary: 'افزودن مسافر جدید' })
  async createTraveler(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateTravelerDto,
  ) {
    return this.userService.createTraveler(userId, dto);
  }

  @Patch('travelers/:id')
  @ApiOperation({ summary: 'بروزرسانی مسافر' })
  async updateTraveler(
    @CurrentUser('id') userId: string,
    @Param('id') travelerId: string,
    @Body() dto: UpdateTravelerDto,
  ) {
    return this.userService.updateTraveler(userId, travelerId, dto);
  }

  @Delete('travelers/:id')
  @ApiOperation({ summary: 'حذف مسافر' })
  async deleteTraveler(
    @CurrentUser('id') userId: string,
    @Param('id') travelerId: string,
  ) {
    return this.userService.deleteTraveler(userId, travelerId);
  }

  // Sessions
  @Get('sessions')
  @ApiOperation({ summary: 'دریافت جلسات فعال' })
  async getSessions(@CurrentUser('id') userId: string) {
    return this.userService.getSessions(userId);
  }

  @Delete('sessions/:id')
  @ApiOperation({ summary: 'حذف جلسه' })
  async deleteSession(
    @CurrentUser('id') userId: string,
    @Param('id') sessionId: string,
  ) {
    return this.userService.deleteSession(userId, sessionId);
  }
}
