import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import { Public } from '../../common/decorators/public.decorator';

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
}
