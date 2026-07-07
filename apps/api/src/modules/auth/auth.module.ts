import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService, PasswordService, TokenService } from './services';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}), // Configuration is done in TokenService
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    TokenService,
    JwtStrategy,
  ],
  exports: [AuthService, PasswordService, TokenService],
})
export class AuthModule {}
