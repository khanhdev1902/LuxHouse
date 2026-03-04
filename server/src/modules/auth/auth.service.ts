import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequestDto, RegisterRequestDto } from './auth.request.dto';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcryptjs';
import { IAuth } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { JwtConstants } from './auth.constant';
import { UserWithoutPassword } from '../users/user.interface';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(request: RegisterRequestDto): Promise<string> {
    const { name, email, password } = request;
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new BadRequestException('Email đã tồn tại');

    const hashPassword = await bcrypt.hash(password, 10);
    await this.prismaService.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });
      await tx.cart.create({
        data: {
          userId: newUser.id,
        },
      });
    });
    return 'Đăng ký tài khoản thành công!';
  }

  async authenticate(request: AuthRequestDto): Promise<IAuth> {
    console.log('authenticate called');
    const user = await this.validateUser(request.email, request.password);
    if (!user) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng!');
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = randomBytes(32).toString('hex');
    console.log('Generated refresh token:', refreshToken);
    const crsfToken = randomBytes(32).toString('hex');
    const refreshTokenCacheData: { userId: number; expiresAt: number } = {
      userId: user.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    console.log('redisUrl:', process.env.REDIS_URL);
    const caching = await this.cacheManager.set(
      `refreshToken:${refreshToken}`,
      refreshTokenCacheData,
      7 * 24 * 60 * 60 * 1000,
    );
    console.log('Redis:', caching);
    return this.authResponse(accessToken, refreshToken, crsfToken);
  }

  authResponse(
    accessToken: string,
    refreshToken: string,
    crsfToken: string,
  ): IAuth {
    return {
      accessToken,
      refreshToken,
      crsfToken,
      expiresAt: JwtConstants.expiresIn,
      tokenType: 'Bearer',
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    console.log('validateUser called');
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...result } = user;
    return result;
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    crsfToken: string;
    expiresAt: number;
    tokenType: string;
  }> {
    console.log('refreshToken called');
    console.log('Received refresh token:', refreshToken);
    const cacheKey = `refreshToken:${refreshToken}`;
    const cachedData:
      | { userId: number; expiresAt: number; expires: number }
      | undefined = await this.cacheManager.get(cacheKey);
    console.log('Cached data for refresh token:', cachedData);
    if (!cachedData) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: cachedData.userId },
    });
    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại');
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const newRefreshToken = randomBytes(32).toString('hex');
    const crsfToken = randomBytes(32).toString('hex');
    const refreshTokenCacheData: { userId: number; expiresAt: number } = {
      userId: user.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    await this.cacheManager.set(
      `refreshToken:${newRefreshToken}`,
      refreshTokenCacheData,
      7 * 24 * 60 * 60 * 1000,
    );
    return this.authResponse(accessToken, newRefreshToken, crsfToken);
  }
}
