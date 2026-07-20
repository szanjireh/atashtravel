import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCityDto) {
    const country = await this.prisma.country.findUnique({
      where: {
        id: dto.countryId,
      },
    });

    if (!country) {
      throw new BadRequestException('کشور انتخاب شده وجود ندارد');
    }

    return this.prisma.city.create({
      data: {
        countryId: dto.countryId,
        name: dto.name,
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
    });
  }

  async findAll() {
    return this.prisma.city.findMany({
      include: {
        country: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        country: true,
      },
    });

    if (!city) {
      throw new NotFoundException('شهر پیدا نشد');
    }

    return city;
  }
    async update(id: string, dto: UpdateCityDto) {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      throw new NotFoundException('شهر پیدا نشد');
    }

    if (dto.countryId) {
      const country = await this.prisma.country.findUnique({
        where: {
          id: dto.countryId,
        },
      });

      if (!country) {
        throw new BadRequestException('کشور انتخاب شده وجود ندارد');
      }
    }

    return this.prisma.city.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        tours: true,
        hotels: true,
      },
    });

    if (!city) {
      throw new NotFoundException('شهر پیدا نشد');
    }

    if (city.tours.length || city.hotels.length) {
      throw new BadRequestException(
        'ابتدا تورها و هتل‌های این شهر را حذف کنید.',
      );
    }

    await this.prisma.city.delete({
      where: { id },
    });

    return {
      message: 'شهر با موفقیت حذف شد',
    };
  }
}