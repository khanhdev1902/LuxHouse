/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import { DATA_PRODUCTS } from 'prisma/data/product.data';
// import { Prisma } from 'src/generated/prisma/client';
// import { slugify } from 'src/helper/slugify';
// import { PrismaService } from 'src/prisma.service';

// export async function seedProducts(prisma: PrismaService) {
//   for (const item of DATA_PRODUCTS) {
//     await prisma.$transaction(
//       async (tx) => {
//         // 1️⃣ Create product
//         const product = await tx.product.upsert({
//           where: { slug: slugify(item.name) },
//           update: {},
//           create: {
//             name: item.name,
//             slug: slugify(item.name),
//             description: item.description,
//           },
//         });

//         const generatedCode = `LXH-${product.id.toString().padStart(6, '0')}`;

//         // Nếu chưa có productCode thì update
//         if (!product.productCode) {
//           await tx.product.update({
//             where: { id: product.id },
//             data: { productCode: generatedCode },
//           });
//         }

//         const productCode: string = product.productCode ?? generatedCode;

//         // 2️⃣ Categories
//         for (const categoryName of item.categories) {
//           const category = await tx.category.upsert({
//             where: { slug: slugify(categoryName) },
//             update: {},
//             create: {
//               name: categoryName,
//               slug: slugify(categoryName),
//             },
//           });

//           await tx.productCategory.upsert({
//             where: {
//               productId_categoryId: {
//                 productId: product.id,
//                 categoryId: category.id,
//               },
//             },
//             update: {},
//             create: {
//               productId: product.id,
//               categoryId: category.id,
//             },
//           });
//         }

//         // 3️⃣ Product images (product-level)

//         // for (const image of item.images as {
//         //   url: string;
//         //   isMain?: boolean;
//         // }[]) {
//         //   if (!image.url) continue;
//         //   await tx.productImage.upsert({
//         //     where: {
//         //       productId_url: {
//         //         url: image?.url,
//         //         productId: product.id,
//         //       },
//         //     },
//         //     update: {},
//         //     create: {
//         //       productId: product.id,
//         //       url: image.url,
//         //       isMain: image.isMain ?? false,
//         //     },
//         //   });
//         // }

//         // 4️⃣ Attributes + AttributeValues
//         const attributeMap: Record<
//           string,
//           { attributeId: number; values: Record<string, number> }
//         > = {};

//         for (const attr of item.attributes) {
//           const attribute = await tx.attribute.upsert({
//             where: { name: attr.name },
//             update: {},
//             create: { name: attr.name },
//           });

//           attributeMap[attr.name] = {
//             attributeId: attribute.id,
//             values: {},
//           };

//           for (const value of attr.values) {
//             const attributeValue = await tx.attributeValue.upsert({
//               where: {
//                 attributeId_value: {
//                   attributeId: attribute.id,
//                   value,
//                 },
//               },
//               update: {},
//               create: {
//                 attributeId: attribute.id,
//                 value,
//               },
//             });

//             attributeMap[attr.name].values[value] = attributeValue.id;
//           }
//         }

//         // 5 Variants
//         for (let i = 0; i < item.variants.length; i++) {
//           const variant = item.variants[i];

//           const variantIndex = (i + 1).toString().padStart(2, '0');
//           const sku = `${productCode}-${variantIndex}`;

//           const createdVariant = await tx.productVariant.upsert({
//             where: { sku },
//             update: {
//               price: new Prisma.Decimal(variant.price),
//               stock: variant.stock,
//               defaultVariant: variant.defaultVariant,
//             },
//             create: {
//               productId: product.id,
//               sku,
//               price: new Prisma.Decimal(variant.price),
//               stock: variant.stock,
//             },
//           });

//           // if (variant?.discount) {
//           //   // 1️ Tạo Discount trước
//           //   const createdDiscount = await tx.discount.create({
//           //     data: {
//           //       name: `${product.name} - ${sku}`,
//           //       type: 'percentage', // hoặc amount
//           //       value: new Prisma.Decimal(variant.discount.value),
//           //       discountType: variant.discount.discountType,
//           //       startDate: variant.discount.startDate,
//           //       endDate: variant.discount.endDate,
//           //       priority: variant.discount.priority,
//           //       isActive: true,
//           //     },
//           //   });

//           //   // 2️ Tạo pivot table
//           //   await tx.discountProductVariant.create({
//           //     data: {
//           //       discountId: createdDiscount.id,
//           //       productVariantId: createdVariant.id,
//           //     },
//           //   });
//           // }

//           // 5.1 Map attribute combination
//           const mappingData: Prisma.VariantAttributeValueCreateManyInput[] = [];

//           for (const [attrName, valueName] of Object.entries(
//             variant.combination,
//           )) {
//             const attributeValueId = attributeMap[attrName].values[valueName];

//             mappingData.push({
//               productVariantId: createdVariant.id,
//               attributeValueId,
//             });
//           }

//           await tx.variantAttributeValue.deleteMany({
//             where: { productVariantId: createdVariant.id },
//           });

//           await tx.variantAttributeValue.createMany({
//             data: mappingData,
//             skipDuplicates: true,
//           });

//           // 5.2 Variant images
//           if (variant.images?.length) {
//             for (const image of variant.images) {
//               await tx.productImage.upsert({
//                 where: {
//                   productVariantId_url: {
//                     url: image.url,
//                     productVariantId: createdVariant.id,
//                   },
//                 },
//                 update: {},
//                 create: {
//                   productId: product.id,
//                   productVariantId: createdVariant.id,
//                   url: image.url,
//                   isMain: image.isMain ?? false,
//                 },
//               });
//             }
//           }
//         }
//       },
//       {
//         timeout: 20000, // 20 giây
//       },
//     );

//     console.log(`Seeded product: ${item.name}`);
//   }
// }

import { DATA_PRODUCTS } from 'prisma/data/product.data';
import { Prisma } from 'src/generated/prisma/client';
import { slugify } from 'src/helper/slugify';
import { PrismaService } from 'src/prisma.service';

export async function seedProducts(prisma: PrismaService) {
  for (const item of DATA_PRODUCTS) {
    // 1️⃣ Tạo Product
    const product = await prisma.product.upsert({
      where: { slug: slugify(item.name) },
      update: {},
      create: {
        name: item.name,
        slug: slugify(item.name),
        description: item.description,
      },
    });

    // Tạo mã ProductCode dựa trên ID
    const generatedCode = `LXH-${product.id.toString().padStart(6, '0')}`;

    if (!product.productCode) {
      await prisma.product.update({
        where: { id: product.id },
        data: { productCode: generatedCode },
      });
    }

    const productCode: string = product.productCode ?? generatedCode;

    // 2️⃣ Tạo Categories & Product-Category Mapping
    for (const categoryName of item.categories) {
      const category = await prisma.category.upsert({
        where: { slug: slugify(categoryName) },
        update: {},
        create: {
          name: categoryName,
          slug: slugify(categoryName),
        },
      });

      await prisma.productCategory.upsert({
        where: {
          productId_categoryId: {
            productId: product.id,
            categoryId: category.id,
          },
        },
        update: {},
        create: {
          productId: product.id,
          categoryId: category.id,
        },
      });
    }

    // 3️⃣ Xử lý Attributes & AttributeValues
    const attributeMap: Record<
      string,
      { attributeId: number; values: Record<string, number> }
    > = {};

    for (const attr of item.attributes) {
      const attribute = await prisma.attribute.upsert({
        where: { name: attr.name },
        update: {},
        create: { name: attr.name },
      });

      attributeMap[attr.name] = {
        attributeId: attribute.id,
        values: {},
      };

      for (const value of attr.values) {
        const attributeValue = await prisma.attributeValue.upsert({
          where: {
            attributeId_value: {
              attributeId: attribute.id,
              value,
            },
          },
          update: {},
          create: {
            attributeId: attribute.id,
            value,
          },
        });

        attributeMap[attr.name].values[value] = attributeValue.id;
      }
    }

    // 4️⃣ Xử lý Variants
    for (let i = 0; i < item.variants.length; i++) {
      const variant = item.variants[i];
      const variantIndex = (i + 1).toString().padStart(2, '0');
      const sku = `${productCode}-${variantIndex}`;

      const createdVariant = await prisma.productVariant.upsert({
        where: { sku },
        update: {
          price: new Prisma.Decimal(variant.price),
          stock: variant.stock,
          defaultVariant: variant.defaultVariant,
        },
        create: {
          productId: product.id,
          sku,
          price: new Prisma.Decimal(variant.price),
          stock: variant.stock,
          defaultVariant: variant.defaultVariant ?? false,
        },
      });

      // 🎁 5️⃣ Xử lý Discount cho Variant
      if (variant.discount) {
        const discountName = `${product.name} - ${sku}`;

        // Upsert discount để tránh tạo trùng khi chạy lại seed
        const createdDiscount = await prisma.discount.upsert({
          where: { name: discountName },
          update: {
            value: new Prisma.Decimal(variant.discount.value),
            startDate: variant.discount.startDate,
            endDate: variant.discount.endDate,
          },
          create: {
            name: discountName,
            type: 'percentage', // Hoặc dynamic tùy data của anh
            value: new Prisma.Decimal(variant.discount.value),
            discountType: variant.discount.discountType,
            startDate: variant.discount.startDate,
            endDate: variant.discount.endDate,
            priority: variant.discount.priority ?? 1,
            isActive: true,
          },
        });

        // Liên kết Discount với Variant
        await prisma.discountProductVariant.upsert({
          where: {
            discountId_productVariantId: {
              discountId: createdDiscount.id,
              productVariantId: createdVariant.id,
            },
          },
          update: {},
          create: {
            discountId: createdDiscount.id,
            productVariantId: createdVariant.id,
          },
        });
      }

      // 6️⃣ Map Attribute Combinations (ví dụ: Màu sắc: Đỏ, Size: XL)
      const mappingData: Prisma.VariantAttributeValueCreateManyInput[] = [];

      for (const [attrName, valueName] of Object.entries(variant.combination)) {
        const attributeValueId =
          attributeMap[attrName].values[valueName as string];
        if (attributeValueId) {
          mappingData.push({
            productVariantId: createdVariant.id,
            attributeValueId,
          });
        }
      }

      // Xóa mapping cũ và tạo lại để đảm bảo tính chính xác
      await prisma.variantAttributeValue.deleteMany({
        where: { productVariantId: createdVariant.id },
      });

      await prisma.variantAttributeValue.createMany({
        data: mappingData,
        skipDuplicates: true,
      });

      // 7️⃣ Variant Images
      if (variant.images?.length) {
        for (const image of variant.images) {
          await prisma.productImage.upsert({
            where: {
              productVariantId_url: {
                url: image.url,
                productVariantId: createdVariant.id,
              },
            },
            update: {
              isMain: image.isMain ?? false,
            },
            create: {
              productId: product.id,
              productVariantId: createdVariant.id,
              url: image.url,
              isMain: image.isMain ?? false,
            },
          });
        }
      }
    }

    console.log(`🚀 Seeded thành công: ${item.name}`);
  }
}
