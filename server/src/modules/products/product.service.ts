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
  ): Promise<ApiResponseType<ProductListItem[]>> {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      minPrice,
      maxPrice,
      // sort = 'newest',
    } = query;
    console.log('haha', query);
    const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };

    if (search) {
      where.slug = {
        contains: slugify(search),
        // mode: 'insensitive',
      };
    }
    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category,
          },
        },
      };
    }
    if (query.categories) {
      const categorySlugs = query.categories.split(',');
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

    //Price filter (theo variant)
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.variants = {
        some: {
          price: {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
          },
        },
      };
    }

    //Sort
    // let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };

    // if (sort === 'price_asc') {
    //   orderBy = {
    //     variants: {
    //       _min: {
    //         price: 'asc',
    //       },
    //     },
    //   };
    // }

    // if (sort === 'price_desc') {
    //   orderBy = {
    //     variants: {
    //       _min: {
    //         price: 'desc',
    //       },
    //     },
    //   };
    // }

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

    const items = products.map(mapProductListItem);
    return ApiResponse.success(
      items,
      'Lấy danh sách sản phẩm thành công',
      200,
      {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    );
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
