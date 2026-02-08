import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<unknown> {
    return this.productService.getListProducts();
  }
  @Get(':slug')
  getProductBySlug(@Param('slug') slug: string): Promise<unknown> {
    return this.productService.getProductBySlug(slug);
  }
}
