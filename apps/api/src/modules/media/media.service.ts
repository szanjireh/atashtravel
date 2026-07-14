import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async findAll(query: any) {
    const { type, folder, search, page = 1, limit = 50 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (type) where.type = type;
    if (folder) where.folder = folder;
    if (search) {
      where.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
        { caption: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [media, total] = await Promise.all([
      this.prisma.mediaLibrary.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.mediaLibrary.count({ where }),
    ]);

    return {
      data: media,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  async findOne(id: string) {
    const media = await this.prisma.mediaLibrary.findUnique({
      where: { id },
    });

    if (!media) throw new NotFoundException('فایل رسانه یافت نشد');

    return media;
  }

  async upload(
    file: Express.Multer.File,
    folder?: string,
    alt?: string,
    caption?: string,
  ) {
    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('نوع فایل مجاز نیست');
    }

    // Upload to MinIO
    const url = await this.uploadService.uploadFile(file, folder || 'media');

    // Determine media type
    let type = 'document';
    if (file.mimetype.startsWith('image/')) {
      type = 'image';
    } else if (file.mimetype.startsWith('video/')) {
      type = 'video';
    }

    // Get image dimensions if it's an image
    let width: number | undefined;
    let height: number | undefined;

    if (type === 'image') {
      // You could use a library like sharp to get dimensions
      // For now, we'll leave it undefined
    }

    // Save to database
    const media = await this.prisma.mediaLibrary.create({
      data: {
        filename: file.originalname,
        url,
        type,
        mimeType: file.mimetype,
        size: file.size,
        width,
        height,
        alt,
        caption,
        folder,
      },
    });

    return media;
  }

  async remove(id: string) {
    const media = await this.prisma.mediaLibrary.findUnique({
      where: { id },
    });

    if (!media) throw new NotFoundException('فایل رسانه یافت نشد');

    // TODO: Delete file from MinIO storage
    // await this.uploadService.deleteFile(media.url);

    await this.prisma.mediaLibrary.delete({
      where: { id },
    });

    return { message: 'فایل رسانه با موفقیت حذف شد' };
  }
}
