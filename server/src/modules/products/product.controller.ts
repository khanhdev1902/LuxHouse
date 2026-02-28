import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductQueryDto } from './product-query.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(@Query() query: ProductQueryDto): Promise<unknown> {
    return this.productService.getListProducts(query);
  }
  @Get(':slug')
  getProductBySlug(@Param('slug') slug: string): Promise<unknown> {
    return this.productService.getProductBySlug(slug);
  }
}
