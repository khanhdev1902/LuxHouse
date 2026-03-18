import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductQueryDto } from './product-query.dto';
import { ApiResponse } from 'src/common/base/api-response';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() query: ProductQueryDto): Promise<unknown> {
    console.log(query);
    const res = await this.productService.getListProducts(query);
    return ApiResponse.success(
      res.lstProducts,
      'Lấy danh sách sản phẩm thành công',
      200,
      res.meta,
    );
  }
  @Get(':slug')
  getProductBySlug(@Param('slug') slug: string): Promise<unknown> {
    return this.productService.getProductBySlug(slug);
  }
}
