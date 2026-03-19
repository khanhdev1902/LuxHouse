import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AddressController],
  providers: [AddressService, PrismaService],
})
export class AddressModule {}
