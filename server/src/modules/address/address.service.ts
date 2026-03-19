import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from './address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getLstAddresses(userId: number) {
    return await this.prisma.userAddress.findMany({
      where: { userId },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        addressType: true,
        province: true,
        district: true,
        ward: true,
        streetAddress: true,
        isDefault: true,
      },
      orderBy: { isDefault: 'desc' },
    });
  }

  async createAddress(userId: number, data: CreateAddressDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Người dùng không tồn tại!');
    const newAddress = await this.prisma.userAddress.create({
      data: {
        ...data,
        userId: userId,
      },
    });
    return newAddress;
  }

  async updateAddress(
    userId: number,
    addressId: number,
    data: UpdateAddressDto,
  ) {
    const address = await this.findAddress(userId, addressId);

    if (data.isDefault) {
      return await this.prisma.$transaction(async (tx) => {
        await tx.userAddress.updateMany({
          where: { userId, id: { not: address.id } },
          data: { isDefault: false },
        });

        return await tx.userAddress.update({
          where: { id: address.id },
          data: data,
        });
      });
    }

    return await this.prisma.userAddress.update({
      where: { id: address.id },
      data: data,
    });
  }

  async deleteAddress(userId: number, addressId: number) {
    const address = await this.findAddress(userId, addressId);

    if (address.isDefault) {
      throw new BadRequestException(
        'Không thể xóa địa chỉ mặc định! Hãy đặt địa chỉ khác làm mặc định trước.',
      );
    }

    return await this.prisma.userAddress.delete({
      where: { id: addressId },
    });
  }

  private async findAddress(userId: number, addressId: number) {
    const address = await this.prisma.userAddress.findFirst({
      where: { id: addressId, userId: userId },
    });
    if (!address)
      throw new NotFoundException(
        'Địa chỉ không tồn tại hoặc bạn không có quyền truy cập!',
      );
    return address;
  }
}
