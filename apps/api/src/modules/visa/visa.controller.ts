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
import { VisaService } from './visa.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Visa')
@Controller('visa')
export class VisaController {
  constructor(private visaService: VisaService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'لیست خدمات ویزا' })
  @ApiResponse({ status: 200, description: 'لیست خدمات ویزا' })
  async findAll(@Query() query: any) {
    return this.visaService.findAll(query);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'خدمات ویزای ویژه' })
  async getFeatured(@Query('limit') limit?: string) {
    return this.visaService.getFeatured(limit ? parseInt(limit) : 6);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'دریافت اطلاعات خدمات ویزا' })
  @ApiResponse({ status: 200, description: 'اطلاعات خدمات ویزا' })
  @ApiResponse({ status: 404, description: 'خدمات ویزا یافت نشد' })
  async findOne(@Param('id') id: string) {
    return this.visaService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'visa_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد خدمات ویزای جدید' })
  @ApiResponse({ status: 201, description: 'خدمات ویزا ایجاد شد' })
  async create(@Body() data: any) {
    return this.visaService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'visa_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'بروزرسانی خدمات ویزا' })
  @ApiResponse({ status: 200, description: 'خدمات ویزا بروز شد' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.visaService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'visa_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف خدمات ویزا' })
  @ApiResponse({ status: 200, description: 'خدمات ویزا حذف شد' })
  async remove(@Param('id') id: string) {
    return this.visaService.remove(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'visa_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'تغییر وضعیت خدمات ویزا' })
  async toggleStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.visaService.updateStatus(id, status);
  }
}
