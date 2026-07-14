import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VisaService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const {
      search,
      countryId,
      status,
      featured,
      page = 1,
      limit = 20,
    } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    // For public queries, only show active services
    if (status) {
      where.status = status;
    } else {
      where.status = 'active';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (countryId) where.countryId = countryId;
    if (featured !== undefined) where.featured = featured === 'true' || featured === true;

    const [services, total] = await Promise.all([
      this.prisma.visaService.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.visaService.count({ where }),
    ]);

    return {
      data: services,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  async getFeatured(limit: number) {
    const services = await this.prisma.visaService.findMany({
      where: {
        status: 'active',
        featured: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return { data: services };
  }

  async findOne(id: string) {
    const service = await this.prisma.visaService.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!service) throw new NotFoundException('خدمات ویزا یافت نشد');

    return service;
  }

  async create(data: any) {
    // Check if slug exists
    const existing = await this.prisma.visaService.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
    }

    const service = await this.prisma.visaService.create({
      data: {
        title: data.title,
        slug: data.slug,
        countryId: data.countryId,
        description: data.description,
        processingDays: data.processingDays,
        price: data.price,
        currency: data.currency || 'USD',
        requirements: data.requirements,
        documents: data.documents,
        steps: data.steps,
        status: data.status || 'active',
        featured: data.featured || false,
      },
    });

    return service;
  }

  async update(id: string, data: any) {
    const service = await this.prisma.visaService.findUnique({
      where: { id },
    });

    if (!service) throw new NotFoundException('خدمات ویزا یافت نشد');

    // Check if slug is being changed and if it already exists
    if (data.slug && data.slug !== service.slug) {
      const existing = await this.prisma.visaService.findUnique({
        where: { slug: data.slug },
      });

      if (existing) {
        throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
      }
    }

    const updated = await this.prisma.visaService.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        countryId: data.countryId,
        description: data.description,
        processingDays: data.processingDays,
        price: data.price,
        currency: data.currency,
        requirements: data.requirements,
        documents: data.documents,
        steps: data.steps,
        status: data.status,
        featured: data.featured,
      },
    });

    return updated;
  }

  async remove(id: string) {
    const service = await this.prisma.visaService.findUnique({
      where: { id },
    });

    if (!service) throw new NotFoundException('خدمات ویزا یافت نشد');

    await this.prisma.visaService.delete({
      where: { id },
    });

    return { message: 'خدمات ویزا با موفقیت حذف شد' };
  }

  async updateStatus(id: string, status: string) {
    const service = await this.prisma.visaService.findUnique({
      where: { id },
    });

    if (!service) throw new NotFoundException('خدمات ویزا یافت نشد');

    const updated = await this.prisma.visaService.update({
      where: { id },
      data: { status },
    });

    return updated;
  }
}
