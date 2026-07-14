import { Controller, Get, Post, Put, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'جستجوی هتل‌ها' })
  findAll(@Query() query: any) {
    return this.hotelService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'دریافت اطلاعات هتل' })
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'hotel_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد هتل جدید' })
  create(@Body() data: any) {
    return this.hotelService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'hotel_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'بروزرسانی هتل' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.hotelService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'hotel_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف هتل' })
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'hotel_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'تغییر وضعیت هتل' })
  toggleStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.hotelService.updateStatus(id, status);
  }
}
