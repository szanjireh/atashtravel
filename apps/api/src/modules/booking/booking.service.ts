import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: any) {
    const { type, itemId, passengers, startDate } = dto;

    // Validate item exists and is available
    let item: any;
    let totalAmount = 0;

    if (type === 'tour') {
      item = await this.prisma.tour.findUnique({ where: { id: itemId } });
      if (!item) throw new BadRequestException('تور یافت نشد');
      totalAmount = passengers.adults * item.priceAdult + passengers.children * item.priceChild + passengers.infants * item.priceInfant;
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        type,
        status: 'pending',
        totalAmount,
        currency: item.currency || 'IRR',
      },
    });

    // Create booking item
    await this.prisma.bookingItem.create({
      data: {
        bookingId: booking.id,
        itemType: type,
        itemId,
        quantity: 1,
        price: totalAmount,
        startDate: startDate ? new Date(startDate) : undefined,
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
          payment: true,
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
        payment: true,
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
    if (booking.status === 'completed') throw new BadRequestException('رزرو تکمیل شده قابل لغو نیست');

    await this.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled', cancelledAt: new Date() },
    });

    return { message: 'رزرو با موفقیت لغو شد' };
  }
}
