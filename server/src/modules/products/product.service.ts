import { Injectable } from '@nestjs/common';
import { ApiResponse, ApiResponseType } from 'src/common/base/api-response';
import { PrismaService } from 'src/prisma.service';
import { productDetailSelect, productListSelect } from './product.select';
import { mapProductDetail, mapProductListItem } from './product.mapper';
import { ProductDetail, ProductListItem } from './product.interface';
import { ProductQueryDto } from './product-query.dto';
import { Prisma } from 'src/generated/prisma/client';
import { slugify } from 'src/helper/slugify';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getListProducts(
    query: ProductQueryDto,
  ): Promise<{ lstProducts: ProductListItem[]; meta: object }> {
    const {
      page = 1,
      limit = 10,
      search,
      categories,
      colors,
      sizes,
      prices,
      // sort = 'newest',
    } = query;

    const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };

    if (search) where.slug = { contains: slugify(search) };

    if (categories) {
      const categorySlugs = categories.split(', ');
      where.categories = {
        some: {
          category: {
            slug: {
              in: categorySlugs,
            },
          },
        },
      };
    }

    if (colors) {
      const lstColors = colors.split(',').map((c) => c.trim());
      console.log(lstColors);
      where.variants = {
        some: {
          attributeValues: {
            some: {
              attributeValue: {
                value: {
                  in: lstColors,
                },
                attribute: {
                  name: 'Color',
                },
              },
            },
          },
        },
      };
    }

    if (sizes) {
      const lstsizes = sizes.split(',').map((c) => c.trim());
      console.log(lstsizes);
      where.variants = {
        some: {
          attributeValues: {
            some: {
              attributeValue: {
                value: {
                  in: lstsizes,
                },
                attribute: {
                  name: 'Size',
                },
              },
            },
          },
        },
      };
    }

    if (prices) {
      const lstPrices = prices.split(', ');
      const priceConditions = lstPrices.map((price) => {
        const [min, max] = price.split('-').map(Number);
        return {
          price: {
            gte: min,
            lte: max,
          },
        };
      });
      console.log(lstPrices, priceConditions);

      where.variants = {
        some: {
          OR: priceConditions,
        },
      };
    }

    const [products, total] = await Promise.all([
      this.prismaService.product.findMany({
        where,
        skip,
        take: Number(limit),
        // orderBy,
        select: productListSelect,
      }),
      this.prismaService.product.count({ where }),
    ]);

    const lstProducts = products.map(mapProductListItem);
    return {
      lstProducts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
    return ApiResponse.success(result, 'Lấy sản phẩm thành công', 200);
  }
}
