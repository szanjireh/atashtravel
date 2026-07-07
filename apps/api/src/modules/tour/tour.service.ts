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

    const tour = await this.prisma.tour.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        countryId: dto.countryId,
        cityId: dto.cityId,
        categoryId: dto.categoryId,
        durationDays: dto.durationDays,
        durationNights: dto.durationNights,
        status: 'active',
        featured: dto.featured || false,
      },
    });

    return this.findOne(tour.id);
  }

  /**
   * Find all tours with filters
   */
  async findAll(dto: SearchToursDto) {
    const {
      search,
      categoryId,
      minDuration,
      maxDuration,
      sortBy = 'newest',
      page = 1,
      limit = 20,
    } = dto;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: 'active',
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

    if (minDuration !== undefined || maxDuration !== undefined) {
      where.durationDays = {};
      if (minDuration !== undefined) where.durationDays.gte = minDuration;
      if (maxDuration !== undefined) where.durationDays.lte = maxDuration;
    }

    // Build orderBy
    let orderBy: any = { createdAt: 'desc' };
    
    switch (sortBy) {
      case 'duration_asc':
        orderBy = { durationDays: 'asc' };
        break;
      case 'duration_desc':
        orderBy = { durationDays: 'desc' };
        break;
      case 'popular':
      case 'featured':
        orderBy = { featured: 'desc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    const [tours, total] = await Promise.all([
      this.prisma.tour.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 1,
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
        country: true,
        city: true,
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
            departureDate: { gte: new Date() },
          },
          orderBy: { departureDate: 'asc' },
          take: 10,
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!tour) {
      throw new NotFoundException('تور یافت نشد');
    }

    return tour;
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

    const updated = await this.prisma.tour.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.slug && { slug: dto.slug }),
        ...(dto.description && { description: dto.description }),
        ...(dto.durationDays && { durationDays: dto.durationDays }),
        ...(dto.durationNights && { durationNights: dto.durationNights }),
        ...(typeof dto.featured !== 'undefined' && { featured: dto.featured }),
      },
    });

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
        featured: true,
        status: 'active',
        deletedAt: null,
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Get popular tours
   */
  async getPopular(limit = 10) {
    return this.prisma.tour.findMany({
      where: {
        status: 'active',
        deletedAt: null,
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
