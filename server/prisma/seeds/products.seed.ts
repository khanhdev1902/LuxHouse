import { PrismaService } from 'src/prisma.service';
import { randomUUID } from 'crypto';
import { Prisma } from 'src/generated/prisma/client';

const Products = [
  {
    name: 'Giường Ngủ Bọc Vải Phong Cách Ý MOHO COMET',
    images: [
      'https://cdn.hstatic.net/products/200000065946/pro_xam_giuong_boc_vai_cao_cap_moho_comet_6602f5bef2d04018b16e7a76f94729ef_master.png',
      'https://cdn.hstatic.net/files/200000065946/file/giuong-ngu-boc-vai-cao-cao-moho-comet_1024x1024.png',
    ],
    categories: ['Combo phòng ngủ', 'Giường ngủ'],
    price: 11490000,
    stock: 10,
  },
  {
    name: 'Giường Ngủ Bọc Da Cao Cấp Hiện Đại MOHO BLINK',
    images: [
      'https://cdn.hstatic.net/products/200000065946/pro_nau_giuong_boc_da_cao_cap_moho_blink_4_370768cd6d554fdc913ddfc94e028319_master.png',
      'https://cdn.hstatic.net/products/200000065946/pro_nau_giuong_boc_da_cao_cap_moho_blink_5_f8a7fee410ad4882855e769f818e12fc_master.png',
    ],
    categories: ['Combo phòng ngủ', 'Giường ngủ'],
    price: 9490000,
    stock: 10,
  },
  {
    name: 'Combo Tủ Quần Áo Cánh Kính MOHO ASTRO - Nhiều kích thước',
    images: [
      'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_1_41aeaa0c20e3467c94a35eb78d164bec_master.png',
      'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_2_676f8b823fb046449a5acbcda591febd_master.png',
    ],
    categories: ['Combo phòng ngủ', 'Tủ quần áo'],
    price: 11990000,
    stock: 10,
  },
  {
    name: 'Giường Ngủ Có Hộc & Ổ Điện MOHO VIENNA - MÀU TỰ NHIÊN',
    images: [
      'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_5_decd3dca185c4828a209e2b8d67d0dd7_master.jpg',
      'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_noi_that_moho_giuong_co_hoc_vienna_3_fde1e700a3f34b32a9dfd75cfb9d92f0_master.jpg',
    ],
    categories: ['Nệm', 'Phòng ngủ'],
    price: 11990000,
    stock: 10,
  },
  {
    name: 'Nệm Đa Tầng EUFLEX AIR - Bảo Hành 15 Năm',
    images: [
      'https://product.hstatic.net/200000065946/product/pro_nem_da_tang__4__a17dbef35e3e45d1a365600b42270095_master.png',
      'https://product.hstatic.net/200000065946/product/pro_nem_da_tang__3__d283c3484ed94a7da21a12713a963c4e_master.png',
    ],
    categories: ['Nệm', 'Phòng ngủ'],
    price: 8490000,
    stock: 20,
  },
  {
    name: 'Combo Phòng Khách MOHO VLINE Màu Nâu',
    images: [
      'https://product.hstatic.net/200000065946/product/pro_sofa_nem_be_2_eabfa647bde04a0d9c3c11e7574598ac_master.jpg',
      'https://product.hstatic.net/200000065946/product/pro_sofa_nem_be_1m8_6c5ca285c4d74ecea7caf9136f531ab2_master.jpg',
    ],
    categories: ['Phòng khách', 'Combo nội thất'],
    price: 26660000,
    stock: 5,
  },
];

function generateProductCode(prefix = 'PRD') {
  return `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function seedProducts(prisma: PrismaService) {
  await prisma.$transaction(async (tx) => {
    for (const item of Products) {
      const slug = slugify(item.name);

      const product = await tx.product.upsert({
        where: { slug },
        update: {
          price: new Prisma.Decimal(item.price),
          stock: item.stock ?? 0,
          isActive: true,
        },
        create: {
          name: item.name,
          code: generateProductCode(),
          slug,
          price: new Prisma.Decimal(item.price),
          stock: item.stock ?? 0,
          isActive: true,
        },
      });

      await tx.productImage.deleteMany({
        where: { productId: product.id },
      });
      await tx.productImage.createMany({
        data: item.images.map((url) => ({
          url,
          productId: product.id,
        })),
      });

      await tx.productCategory.deleteMany({
        where: { productId: product.id },
      });
      for (const categoryName of item.categories) {
        const category = await tx.category.upsert({
          where: { name: categoryName },
          update: {},
          create: {
            name: categoryName,
            slug: slugify(categoryName),
          },
        });

        await tx.productCategory.upsert({
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
      console.log(
        `Seeded: ${product.code} | ${product.slug} | categories=${item.categories.join(', ')}`,
      );
    }
  });
  console.log('Seed products & images done');
}
