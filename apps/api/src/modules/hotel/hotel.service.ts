import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { search, cityId, minPrice, maxPrice, rating, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = { isActive: true, deletedAt: null };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (cityId) where.cityId = cityId;
    if (rating) where.starRating = { gte: Number(rating) };

    const [hotels, total] = await Promise.all([
      this.prisma.hotel.findMany({
        where,
        include: {
          city: { include: { country: true } },
          images: { take: 1, orderBy: { sortOrder: 'asc' } },
          rooms: { where: { isActive: true }, take: 1 },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.hotel.count({ where }),
    ]);

    return {
      data: hotels,
      meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
    };
  }

  async findOne(id: string) {
    const hotel = await this.prisma.hotel.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        city: { include: { country: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        rooms: {
          where: { isActive: true },
          include: { prices: { where: { date: { gte: new Date() } }, take: 30 } },
        },
        facilities: { include: { facility: true } },
        reviews: { take: 10, include: { user: { select: { firstName: true, lastName: true, avatar: true } } } },
      },
    });

    if (!hotel) throw new NotFoundException('هتل یافت نشد');

    // View count tracking removed - field not in schema

    return hotel;
  }
}
