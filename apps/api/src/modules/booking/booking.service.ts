import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: any) {
    const { bookingType, itemId, passengers } = dto;

    // Validate item exists and is available
    let totalAmount = 0;

    if (bookingType === 'tour') {
      // Check if tour exists via tour dates
      const tourDate = await this.prisma.tourDate.findUnique({
        where: { id: itemId },
        include: { tour: true },
      });
      if (!tourDate) throw new BadRequestException('تور یافت نشد');
      totalAmount = tourDate.basePrice.toNumber();
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        bookingType,
        status: 'draft',
        totalAmount,
        subtotal: totalAmount,
        currency: 'USD',
        bookingNumber: `BK-${Date.now()}`,
      },
    });

    // Create booking item
    await this.prisma.bookingItem.create({
      data: {
        bookingId: booking.id,
        itemType: bookingType,
        itemId,
        quantity: 1,
        unitPrice: totalAmount,
        totalPrice: totalAmount,
      },
    });

    return booking;
  }

  async findAll(userId: string, query: any) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        include: {
          items: true,
          payments: true,
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data: bookings,
      meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
    };
  }

  async findOne(userId: string, id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, userId },
      include: {
        items: true,
        passengers: true,
        payments: true,
        invoice: true,
        voucher: true,
      },
    });

    if (!booking) throw new BadRequestException('رزرو یافت نشد');
    return booking;
  }

  async cancel(userId: string, id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, userId },
    });

    if (!booking) throw new BadRequestException('رزرو یافت نشد');
    if (booking.status === 'cancelled') throw new BadRequestException('رزرو قبلا لغو شده است');

    await this.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    return { message: 'رزرو با موفقیت لغو شد' };
  }
}
