import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTourDto, UpdateTourDto, SearchToursDto } from './dto';

@Injectable()
export class TourService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new tour
   */
  async create(dto: CreateTourDto) {
    // Check if slug exists
    const existing = await this.prisma.tour.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
    }

    const { included, excluded, ...tourData } = dto;

    const tour = await this.prisma.tour.create({
      data: {
        ...tourData,
        status: dto.isActive ? 'published' : 'draft',
      },
    });

    // Create services (included/excluded)
    if (included?.length) {
      await this.prisma.tourService.createMany({
        data: included.map((service) => ({
          tourId: tour.id,
          name: service,
          isIncluded: true,
        })),
      });
    }

    if (excluded?.length) {
      await this.prisma.tourService.createMany({
        data: excluded.map((service) => ({
          tourId: tour.id,
          name: service,
          isIncluded: false,
        })),
      });
    }

    return this.findOne(tour.id);
  }

  /**
   * Find all tours with filters
   */
  async findAll(dto: SearchToursDto) {
    const {
      search,
      categoryId,
      destinationId,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      sortBy = 'newest',
      page = 1,
      limit = 20,
    } = dto;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: 'published',
      isActive: true,
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (destinationId) {
      where.destinationId = destinationId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.priceAdult = {};
      if (minPrice !== undefined) where.priceAdult.gte = minPrice;
      if (maxPrice !== undefined) where.priceAdult.lte = maxPrice;
    }

    if (minDuration !== undefined || maxDuration !== undefined) {
      where.duration = {};
      if (minDuration !== undefined) where.duration.gte = minDuration;
      if (maxDuration !== undefined) where.duration.lte = maxDuration;
    }

    // Build orderBy
    let orderBy: any = { createdAt: 'desc' };
    
    switch (sortBy) {
      case 'price_asc':
        orderBy = { priceAdult: 'asc' };
        break;
      case 'price_desc':
        orderBy = { priceAdult: 'desc' };
        break;
      case 'duration_asc':
        orderBy = { duration: 'asc' };
        break;
      case 'duration_desc':
        orderBy = { duration: 'desc' };
        break;
      case 'popular':
        orderBy = { createdAt: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
    }

    const [tours, total] = await Promise.all([
      this.prisma.tour.findMany({
        where,
        include: {
          category: true,
          destination: true,
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 1,
          },
          _count: {
            select: { reviews: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.tour.count({ where }),
    ]);

    return {
      data: tours,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Find one tour by ID or slug
   */
  async findOne(idOrSlug: string) {
    const tour = await this.prisma.tour.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        category: true,
        destination: {
          include: {
            country: true,
            city: true,
          },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        itineraries: {
          orderBy: { dayNumber: 'asc' },
        },
        services: {
          orderBy: { createdAt: 'asc' },
        },
        dates: {
          where: {
            startDate: { gte: new Date() },
          },
          orderBy: { startDate: 'asc' },
          take: 10,
        },
        tags: {
          include: {
            tag: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: { reviews: true, bookings: true },
        },
      },
    });

    if (!tour) {
      throw new NotFoundException('تور یافت نشد');
    }

    // Calculate average rating
    const avgRating = await this.prisma.review.aggregate({
      where: { entityType: 'tour', entityId: tour.id },
      _avg: { rating: true },
    });

    return {
      ...tour,
      averageRating: avgRating._avg.rating || 0,
    };
  }

  /**
   * Update tour
   */
  async update(id: string, dto: UpdateTourDto) {
    const tour = await this.prisma.tour.findUnique({
      where: { id },
    });

    if (!tour) {
      throw new NotFoundException('تور یافت نشد');
    }

    // Check slug uniqueness if changed
    if (dto.slug && dto.slug !== tour.slug) {
      const existing = await this.prisma.tour.findUnique({
        where: { slug: dto.slug },
      });

      if (existing) {
        throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
      }
    }

    const { included, excluded, ...tourData } = dto;

    const updated = await this.prisma.tour.update({
      where: { id },
      data: {
        ...tourData,
        status: dto.isActive ? 'published' : 'draft',
      },
    });

    // Update services if provided
    if (included !== undefined || excluded !== undefined) {
      // Delete existing services
      await this.prisma.tourService.deleteMany({
        where: { tourId: id },
      });

      // Create new services
      const services: any[] = [];
      if (included?.length) {
        services.push(
          ...included.map((service) => ({
            tourId: id,
            name: service,
            isIncluded: true,
          })),
        );
      }
      if (excluded?.length) {
        services.push(
          ...excluded.map((service) => ({
            tourId: id,
            name: service,
            isIncluded: false,
          })),
        );
      }

      if (services.length) {
        await this.prisma.tourService.createMany({ data: services });
      }
    }

    return this.findOne(updated.id);
  }

  /**
   * Delete tour (soft delete)
   */
  async remove(id: string) {
    const tour = await this.prisma.tour.findUnique({
      where: { id },
    });

    if (!tour) {
      throw new NotFoundException('تور یافت نشد');
    }

    await this.prisma.tour.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'تور با موفقیت حذف شد' };
  }

  /**
   * Get featured tours
   */
  async getFeatured(limit = 6) {
    return this.prisma.tour.findMany({
      where: {
        isFeatured: true,
        isActive: true,
        status: 'published',
        deletedAt: null,
      },
      include: {
        category: true,
        destination: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      orderBy: { featured: 'desc' },
      take: limit,
    });
  }

  /**
   * Get popular tours
   */
  async getPopular(limit = 10) {
    return this.prisma.tour.findMany({
      where: {
        isActive: true,
        status: 'published',
        deletedAt: null,
      },
      include: {
        category: true,
        destination: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      orderBy: { featured: 'desc' },
      take: limit,
    });
  }
}
