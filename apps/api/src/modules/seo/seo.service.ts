import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeoService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { search, page = 1, limit = 50 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { page: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [seoPages, total] = await Promise.all([
      this.prisma.sEOPage.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.sEOPage.count({ where }),
    ]);

    return {
      data: seoPages,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  async findByPage(page: string) {
    const seoPage = await this.prisma.sEOPage.findUnique({
      where: { page },
    });

    if (!seoPage) {
      // Return default SEO values if not found
      return {
        page,
        title: 'Atash Travel',
        description: 'سفرهای خواموشانه، تورها، هتل‌ها و خدمات ویزا',
        keywords: [],
        robots: 'index,follow',
      };
    }

    return seoPage;
  }

  async findOne(id: string) {
    const seoPage = await this.prisma.sEOPage.findUnique({
      where: { id },
    });

    if (!seoPage) throw new NotFoundException('تنظیمات SEO یافت نشد');

    return seoPage;
  }

  async create(data: any) {
    // Check if page already exists
    const existing = await this.prisma.sEOPage.findUnique({
      where: { page: data.page },
    });

    if (existing) {
      throw new BadRequestException('تنظیمات SEO برای این صفحه قبلا ایجاد شده است');
    }

    const seoPage = await this.prisma.sEOPage.create({
      data: {
        page: data.page,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        ogTitle: data.ogTitle,
        ogDescription: data.ogDescription,
        ogImage: data.ogImage,
        canonicalUrl: data.canonicalUrl,
        robots: data.robots,
        structuredData: data.structuredData,
      },
    });

    return seoPage;
  }

  async update(id: string, data: any) {
    const seoPage = await this.prisma.sEOPage.findUnique({
      where: { id },
    });

    if (!seoPage) throw new NotFoundException('تنظیمات SEO یافت نشد');

    // Check if page is being changed and if it already exists
    if (data.page && data.page !== seoPage.page) {
      const existing = await this.prisma.sEOPage.findUnique({
        where: { page: data.page },
      });

      if (existing) {
        throw new BadRequestException('تنظیمات SEO برای این صفحه قبلا ایجاد شده است');
      }
    }

    const updated = await this.prisma.sEOPage.update({
      where: { id },
      data: {
        page: data.page,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        ogTitle: data.ogTitle,
        ogDescription: data.ogDescription,
        ogImage: data.ogImage,
        canonicalUrl: data.canonicalUrl,
        robots: data.robots,
        structuredData: data.structuredData,
      },
    });

    return updated;
  }

  async remove(id: string) {
    const seoPage = await this.prisma.sEOPage.findUnique({
      where: { id },
    });

    if (!seoPage) throw new NotFoundException('تنظیمات SEO یافت نشد');

    await this.prisma.sEOPage.delete({
      where: { id },
    });

    return { message: 'تنظیمات SEO با موفقیت حذف شد' };
  }
}
