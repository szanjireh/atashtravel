import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PasswordService } from '../auth/services/password.service';
import { UpdateProfileDto, ChangePasswordDto, CreateAddressDto, UpdateAddressDto, CreateTravelerDto, UpdateTravelerDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  /**
   * Get user profile
   */
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: { role: true },
        },
        wallet: true,
        loyaltyAccount: true,
      },
    });

    if (!user) {
      throw new NotFoundException('کاربر یافت نشد');
    }

    const { passwordHash, ...profile } = user;
    return profile;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // Check if username is taken
    if (dto.username) {
      const existing = await this.prisma.user.findFirst({
        where: {
          username: dto.username,
          NOT: { id: userId },
        },
      });

      if (existing) {
        throw new BadRequestException('این نام کاربری قبلا استفاده شده است');
      }
    }

    // Check if phone is taken
    if (dto.phone) {
      const existing = await this.prisma.user.findFirst({
        where: {
          phone: dto.phone,
          NOT: { id: userId },
        },
      });

      if (existing) {
        throw new BadRequestException('این شماره تلفن قبلا استفاده شده است');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },
    });

    const { passwordHash, ...profile } = user;
    return profile;
  }

  /**
   * Change password
   */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('کاربر یافت نشد');
    }

    // Verify current password
    const isValid = await this.passwordService.verifyPassword(
      user.passwordHash,
      dto.currentPassword,
    );

    if (!isValid) {
      throw new BadRequestException('رمز عبور فعلی اشتباه است');
    }

    // Hash new password
    const passwordHash = await this.passwordService.hashPassword(dto.newPassword);

    // Update password and invalidate all sessions
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
      }),
      this.prisma.session.deleteMany({
        where: { userId },
      }),
    ]);

    return { message: 'رمز عبور با موفقیت تغییر یافت' };
  }

  /**
   * Get user addresses
   */
  async getAddresses(userId: string) {
    return this.prisma.userAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create address
   */
  async createAddress(userId: string, dto: CreateAddressDto) {
    return this.prisma.userAddress.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  /**
   * Update address
   */
  async updateAddress(userId: string, addressId: string, dto: UpdateAddressDto) {
    // Check ownership
    const address = await this.prisma.userAddress.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new ForbiddenException('شما دسترسی به این آدرس ندارید');
    }

    return this.prisma.userAddress.update({
      where: { id: addressId },
      data: dto,
    });
  }

  /**
   * Delete address
   */
  async deleteAddress(userId: string, addressId: string) {
    const address = await this.prisma.userAddress.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new ForbiddenException('شما دسترسی به این آدرس ندارید');
    }

    await this.prisma.userAddress.delete({
      where: { id: addressId },
    });

    return { message: 'آدرس با موفقیت حذف شد' };
  }

  /**
   * Get travelers
   */
  async getTravelers(userId: string) {
    return this.prisma.traveler.findMany({
      where: { userId },
      include: {
        passports: true,
        emergencyContacts: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create traveler
   */
  async createTraveler(userId: string, dto: CreateTravelerDto) {
    const { passportNumber, passportExpiry, ...travelerData } = dto;

    const traveler = await this.prisma.traveler.create({
      data: {
        userId,
        ...travelerData,
        birthDate: new Date(dto.birthDate),
      },
    });

    // Create passport if provided
    if (passportNumber) {
      await this.prisma.passport.create({
        data: {
          travelerId: traveler.id,
          passport: passportNumber,
          country: dto.nationality || 'Unknown',
          expiryDate: passportExpiry ? new Date(passportExpiry) : new Date(),
        },
      });
    }

    return traveler;
  }

  /**
   * Update traveler
   */
  async updateTraveler(userId: string, travelerId: string, dto: UpdateTravelerDto) {
    const traveler = await this.prisma.traveler.findUnique({
      where: { id: travelerId },
    });

    if (!traveler || traveler.userId !== userId) {
      throw new ForbiddenException('شما دسترسی به این مسافر ندارید');
    }

    const { passportNumber, passportExpiry, ...travelerData } = dto;

    const updated = await this.prisma.traveler.update({
      where: { id: travelerId },
      data: {
        ...travelerData,
        birthDate: new Date(dto.birthDate),
      },
    });

    // Update or create passport
    if (passportNumber) {
      const existingPassport = await this.prisma.passport.findFirst({
        where: { travelerId },
      });

      if (existingPassport) {
        await this.prisma.passport.update({
          where: { id: existingPassport.id },
          data: {
            passport: passportNumber,
            country: dto.nationality || 'Unknown',
            expiryDate: passportExpiry ? new Date(passportExpiry) : existingPassport.expiryDate,
          },
        });
      } else {
        await this.prisma.passport.create({
          data: {
            travelerId,
            passport: passportNumber,
            country: dto.nationality || 'Unknown',
            expiryDate: passportExpiry ? new Date(passportExpiry) : new Date(),
          },
        });
      }
    }

    return updated;
  }

  /**
   * Delete traveler
   */
  async deleteTraveler(userId: string, travelerId: string) {
    const traveler = await this.prisma.traveler.findUnique({
      where: { id: travelerId },
    });

    if (!traveler || traveler.userId !== userId) {
      throw new ForbiddenException('شما دسترسی به این مسافر ندارید');
    }

    await this.prisma.traveler.delete({
      where: { id: travelerId },
    });

    return { message: 'مسافر با موفقیت حذف شد' };
  }

  /**
   * Get user sessions
   */
  async getSessions(userId: string) {
    return this.prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Delete session
   */
  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new ForbiddenException('شما دسترسی به این جلسه ندارید');
    }

    await this.prisma.session.delete({
      where: { id: sessionId },
    });

    return { message: 'جلسه با موفقیت حذف شد' };
  }
}
