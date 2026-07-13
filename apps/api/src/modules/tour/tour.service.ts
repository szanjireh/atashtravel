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

    // Prepare JSON fields
    const tourData: any = {
      title: dto.title,
      slug: dto.slug,
      destination: dto.destination,
      shortDescription: dto.shortDescription,
      fullDescription: dto.fullDescription,
      description: dto.description,
      countryId: dto.countryId,
      cityId: dto.cityId,
      categoryId: dto.categoryId,
      duration: dto.duration,
      durationDays: dto.durationDays,
      durationNights: dto.durationNights,
      price: dto.price,
      priceDetail: dto.priceDetail,
      coverImage: dto.coverImage,
      heroImage: dto.heroImage,
      departureInfo: dto.departureInfo,
      hotelInfo: dto.hotelInfo,
      transportation: dto.transportation,
      bestTime: dto.bestTime,
      status: dto.status || 'draft',
      featured: dto.featured || false,
      seoTitle: dto.seoTitle,
      seoDescription: dto.seoDescription,
      seoOgImage: dto.seoOgImage,
    };

    // Add JSON fields
    if (dto.galleryImages) tourData.galleryImages = dto.galleryImages;
    if (dto.whyChoose) tourData.whyChoose = dto.whyChoose;
    if (dto.attractions) tourData.attractions = dto.attractions;
    if (dto.tips) tourData.tips = dto.tips;
    if (dto.requiredDocuments) tourData.requiredDocuments = dto.requiredDocuments;
    if (dto.faqs) tourData.faqs = dto.faqs;
    if (dto.relatedTours) tourData.relatedTours = dto.relatedTours;
    if (dto.seoKeywords) tourData.seoKeywords = dto.seoKeywords;

    const tour = await this.prisma.tour.create({
      data: tourData,
    });

    // Handle services (included/excluded)
    if (dto.servicesIncluded && dto.servicesIncluded.length > 0) {
      await this.prisma.tourService.createMany({
        data: dto.servicesIncluded.map(service => ({
          tourId: tour.id,
          serviceName: service,
          included: true,
        })),
      });
    }

    if (dto.servicesExcluded && dto.servicesExcluded.length > 0) {
      await this.prisma.tourExcluded.createMany({
        data: dto.servicesExcluded.map(service => ({
          tourId: tour.id,
          serviceName: service,
        })),
      });
    }

    // Handle itinerary
    if (dto.itinerary && dto.itinerary.length > 0) {
      await this.prisma.tourItinerary.createMany({
        data: dto.itinerary.map((day: any, index: number) => ({
          tourId: tour.id,
          dayNumber: index + 1,
          title: day.title,
          description: day.description || day.activities?.join('\n'),
          activities: day.activities?.join('\n'),
          meals: day.meals,
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

    // Prepare update data
    const updateData: any = {};
    
    if (dto.title) updateData.title = dto.title;
    if (dto.slug) updateData.slug = dto.slug;
    if (dto.destination !== undefined) updateData.destination = dto.destination;
    if (dto.shortDescription !== undefined) updateData.shortDescription = dto.shortDescription;
    if (dto.fullDescription !== undefined) updateData.fullDescription = dto.fullDescription;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.countryId) updateData.countryId = dto.countryId;
    if (dto.cityId !== undefined) updateData.cityId = dto.cityId;
    if (dto.categoryId !== undefined) updateData.categoryId = dto.categoryId;
    if (dto.duration !== undefined) updateData.duration = dto.duration;
    if (dto.durationDays) updateData.durationDays = dto.durationDays;
    if (dto.durationNights) updateData.durationNights = dto.durationNights;
    if (dto.price !== undefined) updateData.price = dto.price;
    if (dto.priceDetail !== undefined) updateData.priceDetail = dto.priceDetail;
    if (dto.coverImage !== undefined) updateData.coverImage = dto.coverImage;
    if (dto.heroImage !== undefined) updateData.heroImage = dto.heroImage;
    if (dto.departureInfo !== undefined) updateData.departureInfo = dto.departureInfo;
    if (dto.hotelInfo !== undefined) updateData.hotelInfo = dto.hotelInfo;
    if (dto.transportation !== undefined) updateData.transportation = dto.transportation;
    if (dto.bestTime !== undefined) updateData.bestTime = dto.bestTime;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.featured !== undefined) updateData.featured = dto.featured;
    if (dto.seoTitle !== undefined) updateData.seoTitle = dto.seoTitle;
    if (dto.seoDescription !== undefined) updateData.seoDescription = dto.seoDescription;
    if (dto.seoOgImage !== undefined) updateData.seoOgImage = dto.seoOgImage;
    
    // JSON fields
    if (dto.galleryImages !== undefined) updateData.galleryImages = dto.galleryImages;
    if (dto.whyChoose !== undefined) updateData.whyChoose = dto.whyChoose;
    if (dto.attractions !== undefined) updateData.attractions = dto.attractions;
    if (dto.tips !== undefined) updateData.tips = dto.tips;
    if (dto.requiredDocuments !== undefined) updateData.requiredDocuments = dto.requiredDocuments;
    if (dto.faqs !== undefined) updateData.faqs = dto.faqs;
    if (dto.relatedTours !== undefined) updateData.relatedTours = dto.relatedTours;
    if (dto.seoKeywords !== undefined) updateData.seoKeywords = dto.seoKeywords;

    const updated = await this.prisma.tour.update({
      where: { id },
      data: updateData,
    });

    // Update services if provided
    if (dto.servicesIncluded !== undefined) {
      // Delete existing services
      await this.prisma.tourService.deleteMany({
        where: { tourId: id },
      });
      
      // Create new services
      if (dto.servicesIncluded.length > 0) {
        await this.prisma.tourService.createMany({
          data: dto.servicesIncluded.map(service => ({
            tourId: id,
            serviceName: service,
            included: true,
          })),
        });
      }
    }

    if (dto.servicesExcluded !== undefined) {
      // Delete existing excluded services
      await this.prisma.tourExcluded.deleteMany({
        where: { tourId: id },
      });
      
      // Create new excluded services
      if (dto.servicesExcluded.length > 0) {
        await this.prisma.tourExcluded.createMany({
          data: dto.servicesExcluded.map(service => ({
            tourId: id,
            serviceName: service,
          })),
        });
      }
    }

    // Update itinerary if provided
    if (dto.itinerary !== undefined) {
      // Delete existing itinerary
      await this.prisma.tourItinerary.deleteMany({
        where: { tourId: id },
      });
      
      // Create new itinerary
      if (dto.itinerary.length > 0) {
        await this.prisma.tourItinerary.createMany({
          data: dto.itinerary.map((day: any, index: number) => ({
            tourId: id,
            dayNumber: index + 1,
            title: day.title,
            description: day.description || day.activities?.join('\n'),
            activities: day.activities?.join('\n'),
            meals: day.meals,
          })),
        });
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
