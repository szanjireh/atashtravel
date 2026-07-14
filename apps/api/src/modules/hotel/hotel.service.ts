import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { search, cityId, minPrice, maxPrice, rating, page = 1, limit = 20, status } = query;
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };
    
    // Allow filtering by status (for admin)
    if (status) {
      where.status = status;
    } else {
      // Public queries only show active hotels
      where.status = 'active';
    }

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
      where: { 
        OR: [{ id }, { slug: id }],
        deletedAt: null 
      },
      include: {
        city: { include: { country: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        roomTypes: {
          include: {
            rooms: true,
            prices: { where: { date: { gte: new Date() } }, take: 30 },
          },
        },
        facilities: { include: { facility: true } },
        reviews: { take: 10, include: { booking: true } },
      },
    });

    if (!hotel) throw new NotFoundException('هتل یافت نشد');

    return hotel;
  }

  async create(data: any) {
    // Check if slug exists
    const existing = await this.prisma.hotel.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
    }

    const hotel = await this.prisma.hotel.create({
      data: {
        name: data.name,
        slug: data.slug,
        countryId: data.countryId,
        cityId: data.cityId,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        starRating: data.starRating,
        description: data.description,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        phone: data.phone,
        email: data.email,
        website: data.website,
        status: data.status || 'active',
      },
      include: {
        city: { include: { country: true } },
      },
    });

    // Handle images if provided
    if (data.images && data.images.length > 0) {
      await this.prisma.hotelImage.createMany({
        data: data.images.map((img: any, index: number) => ({
          hotelId: hotel.id,
          url: img.url,
          sortOrder: index,
          isCover: index === 0,
        })),
      });
    }

    return this.findOne(hotel.id);
  }

  async update(id: string, data: any) {
    const hotel = await this.prisma.hotel.findFirst({
      where: { id, deletedAt: null },
    });

    if (!hotel) throw new NotFoundException('هتل یافت نشد');

    // Check if slug is being changed and if it already exists
    if (data.slug && data.slug !== hotel.slug) {
      const existing = await this.prisma.hotel.findUnique({
        where: { slug: data.slug },
      });

      if (existing) {
        throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
      }
    }

    const updated = await this.prisma.hotel.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        countryId: data.countryId,
        cityId: data.cityId,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        starRating: data.starRating,
        description: data.description,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        phone: data.phone,
        email: data.email,
        website: data.website,
        status: data.status,
      },
      include: {
        city: { include: { country: true } },
      },
    });

    // Handle images update if provided
    if (data.images) {
      // Delete existing images
      await this.prisma.hotelImage.deleteMany({
        where: { hotelId: id },
      });

      // Create new images
      if (data.images.length > 0) {
        await this.prisma.hotelImage.createMany({
          data: data.images.map((img: any, index: number) => ({
            hotelId: id,
            url: img.url,
            sortOrder: index,
            isCover: index === 0,
          })),
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const hotel = await this.prisma.hotel.findFirst({
      where: { id, deletedAt: null },
    });

    if (!hotel) throw new NotFoundException('هتل یافت نشد');

    // Soft delete
    await this.prisma.hotel.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'هتل با موفقیت حذف شد' };
  }

  async updateStatus(id: string, status: string) {
    const hotel = await this.prisma.hotel.findFirst({
      where: { id, deletedAt: null },
    });

    if (!hotel) throw new NotFoundException('هتل یافت نشد');

    const updated = await this.prisma.hotel.update({
      where: { id },
      data: { status },
    });

    return updated;
  }
}

