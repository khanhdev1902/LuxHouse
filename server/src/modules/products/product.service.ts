import { Injectable } from '@nestjs/common';
import { ApiResponse, ApiResponseType } from 'src/common/base/api-response';
import { PrismaService } from 'src/prisma.service';
import { productDetailSelect, productListSelect } from './product.select';
import { mapProductDetail, mapProductListItem } from './product.mapper';
import { ProductDetail, ProductListItem } from './product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getListProducts(): Promise<ApiResponseType<ProductListItem[]>> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const products = await this.prismaService.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: productListSelect,
    });

    const result = products.map(mapProductListItem);
    return ApiResponse.ok(result, 'Lấy danh sách sản phẩm thành công', 200);
  }

  async getProductBySlug(
    slug: string,
  ): Promise<ApiResponseType<ProductDetail | null>> {
    const product = await this.prismaService.product.findUnique({
      where: { slug },
      select: productDetailSelect,
    });
    if (!product) {
      return ApiResponse.error(null, 'Không tìm thấy sản phẩm', 404);
    }
    const result = mapProductDetail(product);
    return ApiResponse.ok(result, 'Lấy sản phẩm thành công', 200);
  }
}
