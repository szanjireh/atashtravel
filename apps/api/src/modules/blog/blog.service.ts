import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const {
      search,
      categoryId,
      status,
      published,
      featured,
      page = 1,
      limit = 20,
    } = query;
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };

    // For public queries, only show published articles
    if (status) {
      where.status = status;
    } else if (published !== undefined) {
      where.published = published === 'true' || published === true;
    } else {
      // Default public filter
      where.published = true;
      where.status = 'published';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) where.categoryId = categoryId;
    if (featured !== undefined) where.featured = featured === 'true' || featured === true;

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data: articles,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  async getFeatured(limit: number) {
    const articles = await this.prisma.article.findMany({
      where: {
        published: true,
        featured: true,
        deletedAt: null,
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });

    return { data: articles };
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        deletedAt: null,
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!article) throw new NotFoundException('مقاله یافت نشد');

    return article;
  }

  async create(data: any) {
    // Check if slug exists
    const existing = await this.prisma.article.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
    }

    const article = await this.prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        categoryId: data.categoryId,
        status: data.status || 'draft',
        published: data.published || false,
        featured: data.featured || false,
        publishedAt: data.published ? new Date() : null,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
      },
    });

    // Handle tags
    if (data.tags && data.tags.length > 0) {
      for (const tagName of data.tags) {
        // Find or create tag
        let tag = await this.prisma.tag.findUnique({
          where: { slug: this.slugify(tagName) },
        });

        if (!tag) {
          tag = await this.prisma.tag.create({
            data: {
              name: tagName,
              slug: this.slugify(tagName),
            },
          });
        }

        // Create relation
        await this.prisma.articleTag.create({
          data: {
            articleId: article.id,
            tagId: tag.id,
          },
        });
      }
    }

    return this.findOne(article.id);
  }

  async update(id: string, data: any) {
    const article = await this.prisma.article.findFirst({
      where: { id, deletedAt: null },
    });

    if (!article) throw new NotFoundException('مقاله یافت نشد');

    // Check if slug is being changed and if it already exists
    if (data.slug && data.slug !== article.slug) {
      const existing = await this.prisma.article.findUnique({
        where: { slug: data.slug },
      });

      if (existing) {
        throw new BadRequestException('این شناسه URL قبلا استفاده شده است');
      }
    }

    const updated = await this.prisma.article.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        categoryId: data.categoryId,
        status: data.status,
        published: data.published,
        featured: data.featured,
        publishedAt: data.published && !article.published ? new Date() : article.publishedAt,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
      },
    });

    // Handle tags update
    if (data.tags) {
      // Remove existing tags
      await this.prisma.articleTag.deleteMany({
        where: { articleId: id },
      });

      // Add new tags
      if (data.tags.length > 0) {
        for (const tagName of data.tags) {
          let tag = await this.prisma.tag.findUnique({
            where: { slug: this.slugify(tagName) },
          });

          if (!tag) {
            tag = await this.prisma.tag.create({
              data: {
                name: tagName,
                slug: this.slugify(tagName),
              },
            });
          }

          await this.prisma.articleTag.create({
            data: {
              articleId: id,
              tagId: tag.id,
            },
          });
        }
      }
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const article = await this.prisma.article.findFirst({
      where: { id, deletedAt: null },
    });

    if (!article) throw new NotFoundException('مقاله یافت نشد');

    // Soft delete
    await this.prisma.article.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'مقاله با موفقیت حذف شد' };
  }

  async togglePublish(id: string, published: boolean) {
    const article = await this.prisma.article.findFirst({
      where: { id, deletedAt: null },
    });

    if (!article) throw new NotFoundException('مقاله یافت نشد');

    const updated = await this.prisma.article.update({
      where: { id },
      data: {
        published,
        status: published ? 'published' : 'draft',
        publishedAt: published && !article.published ? new Date() : article.publishedAt,
      },
    });

    return updated;
  }

  async toggleFeatured(id: string, featured: boolean) {
    const article = await this.prisma.article.findFirst({
      where: { id, deletedAt: null },
    });

    if (!article) throw new NotFoundException('مقاله یافت نشد');

    const updated = await this.prisma.article.update({
      where: { id },
      data: { featured },
    });

    return updated;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
