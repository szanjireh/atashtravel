import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Media')
@Controller('media')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'لیست فایل‌های رسانه' })
  @ApiResponse({ status: 200, description: 'لیست فایل‌های رسانه' })
  async findAll(@Query() query: any) {
    return this.mediaService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت اطلاعات فایل رسانه' })
  @ApiResponse({ status: 200, description: 'اطلاعات فایل رسانه' })
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Post('upload')
  @Roles('admin', 'content_manager', 'tour_manager')
  @ApiOperation({ summary: 'آپلود فایل رسانه' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'فایل آپلود شد' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
    @Body('alt') alt?: string,
    @Body('caption') caption?: string,
  ) {
    if (!file) {
      throw new BadRequestException('فایلی انتخاب نشده است');
    }

    return this.mediaService.upload(file, folder, alt, caption);
  }

  @Delete(':id')
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'حذف فایل رسانه' })
  @ApiResponse({ status: 200, description: 'فایل حذف شد' })
  async remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
