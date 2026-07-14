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
import { BlogService } from './blog.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'لیست مقالات' })
  @ApiResponse({ status: 200, description: 'لیست مقالات' })
  async findAll(@Query() query: any) {
    return this.blogService.findAll(query);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'مقالات ویژه' })
  async getFeatured(@Query('limit') limit?: string) {
    return this.blogService.getFeatured(limit ? parseInt(limit) : 6);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'دریافت اطلاعات مقاله' })
  @ApiResponse({ status: 200, description: 'اطلاعات مقاله' })
  @ApiResponse({ status: 404, description: 'مقاله یافت نشد' })
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'content_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد مقاله جدید' })
  @ApiResponse({ status: 201, description: 'مقاله ایجاد شد' })
  async create(@Body() data: any) {
    return this.blogService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'content_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'بروزرسانی مقاله' })
  @ApiResponse({ status: 200, description: 'مقاله بروز شد' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.blogService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'content_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف مقاله' })
  @ApiResponse({ status: 200, description: 'مقاله حذف شد' })
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'content_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'انتشار مقاله' })
  async togglePublish(@Param('id') id: string, @Body('published') published: boolean) {
    return this.blogService.togglePublish(id, published);
  }

  @Patch(':id/featured')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'content_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'تغییر وضعیت ویژه مقاله' })
  async toggleFeatured(@Param('id') id: string, @Body('featured') featured: boolean) {
    return this.blogService.toggleFeatured(id, featured);
  }
}
