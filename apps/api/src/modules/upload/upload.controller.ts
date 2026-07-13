import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('image')
  @Roles('admin', 'tour_manager')
  @ApiOperation({ summary: 'آپلود تصویر تکی' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'تصویر با موفقیت آپلود شد' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // Validate image
    if (!file) {
      throw new BadRequestException('فایلی انتخاب نشده است');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('فقط فایل‌های تصویری مجاز هستند (JPEG, PNG, WebP)');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('حجم فایل نباید بیشتر از 5 مگابایت باشد');
    }

    const url = await this.uploadService.uploadFile(file, 'images');
    
    return {
      url,
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Post('images')
  @Roles('admin', 'tour_manager')
  @ApiOperation({ summary: 'آپلود چند تصویر' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'تصاویر با موفقیت آپلود شدند' })
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('فایلی انتخاب نشده است');
    }

    // Validate all images
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException(`فایل ${file.originalname}: فقط فایل‌های تصویری مجاز هستند`);
      }
      if (file.size > maxSize) {
        throw new BadRequestException(`فایل ${file.originalname}: حجم فایل نباید بیشتر از 5 مگابایت باشد`);
      }
    }

    const urls = await this.uploadService.uploadFiles(files, 'images');
    
    return {
      urls,
      count: urls.length,
    };
  }

  @Post('tour-image')
  @Roles('admin', 'tour_manager')
  @ApiOperation({ summary: 'آپلود تصویر تور' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'تصویر تور با موفقیت آپلود شد' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadTourImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('فایلی انتخاب نشده است');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('فقط فایل‌های تصویری مجاز هستند');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('حجم فایل نباید بیشتر از 5 مگابایت باشد');
    }

    const url = await this.uploadService.uploadFile(file, 'images/tours');
    
    return {
      url,
      filename: file.originalname,
      size: file.size,
    };
  }
}
