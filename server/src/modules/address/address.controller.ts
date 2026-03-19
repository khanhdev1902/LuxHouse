import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import type { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { ApiResponse } from 'src/common/base/api-response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAddressDto, UpdateAddressDto } from './address.dto';

@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getLstAddresses(@Req() req: AuthRequest) {
    const lstAddresses = await this.addressService.getLstAddresses(
      req.user.userId,
    );
    return ApiResponse.success(
      lstAddresses,
      'Lấy danh sách địa chỉ thành công!',
      200,
    );
  }

  @Post()
  async createAddress(@Req() req: AuthRequest, @Body() data: CreateAddressDto) {
    const newAddress = await this.addressService.createAddress(
      req.user.userId,
      data,
    );
    return ApiResponse.success(newAddress, 'Thêm địa chỉ mới thành công!', 200);
  }

  @Patch(':id')
  async updateAddress(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAddressDto,
  ) {
    const updateAddress = await this.addressService.updateAddress(
      req.user.userId,
      id,
      data,
    );
    return ApiResponse.success(
      updateAddress,
      'Cập nhật địa chỉ người dùng thành công!',
      200,
    );
  }

  @Delete(':id')
  async deleteAddress(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.addressService.deleteAddress(req.user.userId, id);
    return ApiResponse.message(
      `Xóa địa chỉ người dùng của ${req.user.name} với id: ${id} thành công!`,
      200,
    );
  }
}
