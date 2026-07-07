import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد رزرو جدید' })
  create(@CurrentUser('id') userId: string, @Body() dto: any) {
    return this.bookingService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست رزروها' })
  findAll(@CurrentUser('id') userId: string, @Query() query: any) {
    return this.bookingService.findAll(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات رزرو' })
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.bookingService.findOne(userId, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'لغو رزرو' })
  cancel(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.bookingService.cancel(userId, id);
  }
}
