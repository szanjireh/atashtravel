import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SeoService } from './seo.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('SEO')
@Controller('seo')
export class SeoController {
  constructor(private seoService: SeoService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'لیست تنظیمات SEO' })
  @ApiResponse({ status: 200, description: 'لیست تنظیمات SEO' })
  async findAll(@Query() query: any) {
    return this.seoService.findAll(query);
  }

  @Public()
  @Get('page/:page')
  @ApiOperation({ summary: 'دریافت تنظیمات SEO صفحه' })
  @ApiResponse({ status: 200, description: 'تنظیمات SEO صفحه' })
  async findByPage(@Param('page') page: string) {
    return this.seoService.findByPage(page);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'دریافت تنظیمات SEO' })
  @ApiResponse({ status: 200, description: 'تنظیمات SEO' })
  async findOne(@Param('id') id: string) {
    return this.seoService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'seo_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد تنظیمات SEO جدید' })
  @ApiResponse({ status: 201, description: 'تنظیمات SEO ایجاد شد' })
  async create(@Body() data: any) {
    return this.seoService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'seo_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'بروزرسانی تنظیمات SEO' })
  @ApiResponse({ status: 200, description: 'تنظیمات SEO بروز شد' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.seoService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'seo_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف تنظیمات SEO' })
  @ApiResponse({ status: 200, description: 'تنظیمات SEO حذف شد' })
  async remove(@Param('id') id: string) {
    return this.seoService.remove(id);
  }
}
