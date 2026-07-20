import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.country.findMany({
      include: {
        cities: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      include: {
        cities: true,
      },
    });

    if (!country) {
      throw new NotFoundException('کشور پیدا نشد');
    }

    return country;
  }

  async create(dto: CreateCountryDto) {
    const exists = await this.prisma.country.findFirst({
      where: {
        OR: [
          { iso2: dto.iso2 },
          { iso3: dto.iso3 },
        ],
      },
    });

    if (exists) {
      throw new BadRequestException(
        'کد کشور قبلاً ثبت شده است',
      );
    }

    return this.prisma.country.create({
      data: {
        name: dto.name,
        iso2: dto.iso2,
        iso3: dto.iso3,
        phoneCode: dto.phoneCode,
      },
    });
  } 
   async update(id: string, dto: UpdateCountryDto) {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      throw new NotFoundException('کشور پیدا نشد');
    }

    if (dto.iso2 || dto.iso3) {
      const exists = await this.prisma.country.findFirst({
        where: {
          id: { not: id },
          OR: [
            dto.iso2 ? { iso2: dto.iso2 } : {},
            dto.iso3 ? { iso3: dto.iso3 } : {},
          ],
        },
      });

      if (exists) {
        throw new BadRequestException('کد کشور قبلاً ثبت شده است');
      }
    }

    return this.prisma.country.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      include: {
        cities: true,
        tours: true,
        hotels: true,
      },
    });

    if (!country) {
      throw new NotFoundException('کشور پیدا نشد');
    }

    if (
      country.cities.length ||
      country.tours.length ||
      country.hotels.length
    ) {
      throw new BadRequestException(
        'ابتدا شهرها، تورها و هتل‌های این کشور را حذف کنید.'
      );
    }

    await this.prisma.country.delete({
      where: { id },
    });

    return {
      message: 'کشور با موفقیت حذف شد',
    };
  }
}