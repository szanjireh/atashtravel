import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TourService } from './tour.service';
import { CreateTourDto, UpdateTourDto, SearchToursDto } from './dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tours')
@Controller('tours')
export class TourController {
  constructor(private tourService: TourService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'جستجوی تورها' })
  @ApiResponse({ status: 200, description: 'لیست تورها' })
  async findAll(@Query() dto: SearchToursDto) {
    return this.tourService.findAll(dto);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'تورهای ویژه' })
  @ApiResponse({ status: 200, description: 'لیست تورهای ویژه' })
  async getFeatured(@Query('limit') limit?: string) {
    return this.tourService.getFeatured(limit ? parseInt(limit) : 6);
  }

  @Public()
  @Get('popular')
  @ApiOperation({ summary: 'تورهای محبوب' })
  @ApiResponse({ status: 200, description: 'لیست تورهای محبوب' })
  async getPopular(@Query('limit') limit?: string) {
    return this.tourService.getPopular(limit ? parseInt(limit) : 10);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'دریافت اطلاعات یک تور' })
  @ApiResponse({ status: 200, description: 'اطلاعات تور' })
  @ApiResponse({ status: 404, description: 'تور یافت نشد' })
  async findOne(@Param('id') id: string) {
    return this.tourService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'tour_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد تور جدید' })
  @ApiResponse({ status: 201, description: 'تور ایجاد شد' })
  async create(@Body() dto: CreateTourDto) {
    return this.tourService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'tour_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'بروزرسانی تور' })
  @ApiResponse({ status: 200, description: 'تور بروز شد' })
  async update(@Param('id') id: string, @Body() dto: UpdateTourDto) {
    return this.tourService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'tour_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف تور' })
  @ApiResponse({ status: 200, description: 'تور حذف شد' })
  async remove(@Param('id') id: string) {
    return this.tourService.remove(id);
  }
}
