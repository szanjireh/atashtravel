import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Generate access and refresh token pair
   */
  async generateTokens(payload: JwtPayload): Promise<TokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  /**
   * Verify access token
   */
  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Verify refresh token
   */
  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }
}
