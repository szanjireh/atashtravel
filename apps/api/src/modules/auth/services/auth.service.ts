import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PasswordService } from './password.service';
import { TokenService, JwtPayload, TokenPair } from './token.service';
import { RegisterDto, LoginDto } from '../dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  /**
   * Register a new user
   */
  async register(dto: RegisterDto, ipAddress?: string, userAgent?: string) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          ...(dto.phone ? [{ phone: dto.phone }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('کاربری با این ایمیل یا شماره تلفن قبلا ثبت‌نام کرده است');
    }

    // Hash password
    const passwordHash = await this.passwordService.hashPassword(dto.password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        preferredLanguage: dto.preferredLanguage || 'fa',
        preferredCurrency: dto.preferredCurrency || 'IRR',
        status: 'active',
        isVerified: false,
      },
    });

    // Assign default 'user' role
    const userRole = await this.prisma.role.findFirst({
      where: { name: 'user' },
    });

    if (userRole) {
      await this.prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: userRole.id,
        },
      });
    }

    // Create email verification token
    const verificationToken = uuidv4();
    await this.prisma.emailVerification.create({
      data: {
        userId: user.id,
        token: verificationToken,
      },
    });

    // TODO: Send verification email

    // Generate tokens
    const roles = userRole ? [userRole.name] : [];
    const tokens = await this.tokenService.generateTokens({
      sub: user.id,
      email: user.email,
      roles,
    });

    // Create session
    await this.createSession(user.id, tokens.refreshToken, ipAddress, userAgent);

    return {
      user: this.sanitizeUser(user),
      tokens,
      verificationToken, // In production, don't return this
    };
  }

  /**
   * Login user
   */
  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new UnauthorizedException('حساب کاربری شما غیرفعال شده است');
    }

    // Verify password
    const isPasswordValid = await this.passwordService.verifyPassword(
      user.passwordHash,
      dto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
    }

    // Check if email is verified (optional: can be enabled later)
    // if (!user.isVerified) {
    //   throw new UnauthorizedException('لطفاً ابتدا ایمیل خود را تایید کنید');
    // }

    // Get roles
    const roles = user.userRoles.map((ur) => ur.role.name);

    // Generate tokens
    const tokens = await this.tokenService.generateTokens({
      sub: user.id,
      email: user.email,
      roles,
    });

    // Create session
    await this.createSession(user.id, tokens.refreshToken, ipAddress, userAgent);

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  /**
   * Refresh tokens
   */
  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.tokenService.verifyRefreshToken(refreshToken);

      // Find session
      const session = await this.prisma.session.findFirst({
        where: {
          userId: payload.sub,
          refreshToken,
          expiresAt: { gt: new Date() },
        },
      });

      if (!session) {
        throw new UnauthorizedException('جلسه کاربری نامعتبر است');
      }

      // Find user with roles
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          userRoles: {
            include: { role: true },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException('کاربر یافت نشد');
      }

      // Generate new tokens
      const roles = user.userRoles.map((ur) => ur.role.name);
      const newTokens = await this.tokenService.generateTokens({
        sub: user.id,
        email: user.email,
        roles,
      });

      // Update session
      await this.prisma.session.update({
        where: { id: session.id },
        data: {
          refreshToken: newTokens.refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      return {
        tokens: newTokens,
      };
    } catch (error) {
      throw new UnauthorizedException('توکن نامعتبر است');
    }
  }

  /**
   * Logout user
   */
  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      await this.prisma.session.deleteMany({
        where: {
          userId,
          refreshToken,
        },
      });
    } else {
      // Logout from all devices
      await this.prisma.session.deleteMany({
        where: { userId },
      });
    }

    return { message: 'با موفقیت خارج شدید' };
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string) {
    const verification = await this.prisma.emailVerification.findFirst({
      where: {
        token,
        verifiedAt: null,
      },
    });

    if (!verification) {
      throw new BadRequestException('لینک تایید نامعتبر است');
    }

    // Mark as verified
    await this.prisma.$transaction([
      this.prisma.emailVerification.update({
        where: { id: verification.id },
        data: { verifiedAt: new Date() },
      }),
      this.prisma.user.update({
        where: { id: verification.userId },
        data: { isVerified: true },
      }),
    ]);

    return { message: 'ایمیل شما با موفقیت تایید شد' };
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'اگر ایمیل شما در سیستم موجود باشد، لینک بازیابی رمز عبور ارسال خواهد شد' };
    }

    // Create reset token
    const resetToken = uuidv4();
    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    // TODO: Send reset email

    return { 
      message: 'اگر ایمیل شما در سیستم موجود باشد، لینک بازیابی رمز عبور ارسال خواهد شد',
      resetToken, // In production, don't return this
    };
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string) {
    const resetRequest = await this.prisma.passwordReset.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!resetRequest) {
      throw new BadRequestException('لینک بازیابی نامعتبر یا منقضی شده است');
    }

    // Hash new password
    const passwordHash = await this.passwordService.hashPassword(newPassword);

    // Update password and mark token as used
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetRequest.userId },
        data: { passwordHash },
      }),
      this.prisma.passwordReset.update({
        where: { id: resetRequest.id },
        data: { usedAt: new Date() },
      }),
      // Invalidate all sessions
      this.prisma.session.deleteMany({
        where: { userId: resetRequest.userId },
      }),
    ]);

    return { message: 'رمز عبور شما با موفقیت تغییر یافت' };
  }

  /**
   * Create a new session
   */
  private async createSession(
    userId: string,
    refreshToken: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    // Parse user agent
    let device = 'unknown';
    let browser = 'unknown';
    let os = 'unknown';

    if (userAgent) {
      // Basic parsing (in production, use a library like ua-parser-js)
      if (userAgent.includes('Mobile')) device = 'mobile';
      else if (userAgent.includes('Tablet')) device = 'tablet';
      else device = 'desktop';

      if (userAgent.includes('Chrome')) browser = 'Chrome';
      else if (userAgent.includes('Firefox')) browser = 'Firefox';
      else if (userAgent.includes('Safari')) browser = 'Safari';

      if (userAgent.includes('Windows')) os = 'Windows';
      else if (userAgent.includes('Mac')) os = 'macOS';
      else if (userAgent.includes('Linux')) os = 'Linux';
      else if (userAgent.includes('Android')) os = 'Android';
      else if (userAgent.includes('iOS')) os = 'iOS';
    }

    return this.prisma.session.create({
      data: {
        userId,
        refreshToken,
        ipAddress,
        device,
        browser,
        os,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: any) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}
