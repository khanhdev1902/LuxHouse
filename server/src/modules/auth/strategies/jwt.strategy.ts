import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from '../auth.constant';
import { PrismaService } from 'src/prisma.service';
import { IAuthPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: IAuthPayload) {
    console.log(payload);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại !');
    }

    // return cai gi cai do thanh req.user
    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
