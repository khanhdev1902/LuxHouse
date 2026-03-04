import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartController } from './cart.controller';
import { AuthModule } from '../auth/auth.module';
import { CartService } from './cart.service';

@Module({
  imports: [AuthModule],
  controllers: [CartController],
  providers: [PrismaService, CartService],
})
export class CartModule {}
