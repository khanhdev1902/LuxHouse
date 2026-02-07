import { PrismaService } from 'src/prisma.service';
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
export async function seedCategories(prisma: PrismaService) {
  for (const category of allCategorieProducts) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        slug: slugify(category.name),
      },
    });
  }
  console.log('Seed categories successfully');
}
const allCategorieProducts = [
  { name: 'Bếp' },
  { name: 'Chăn Ga - Gối Nệm' },
  { name: 'Bình - Chậu - Lọ' },
  { name: 'Tủ Quần Áo' },
  { name: 'Tranh Treo Tường' },
  { name: 'Giường Ngủ' },
  { name: 'Ghế Sofa' },
  { name: 'Ghế Ăn' },
  { name: 'Bàn Ăn' },
  { name: 'Đồ Nhà Bếp' },
  { name: 'Gương' },
  { name: 'Thảm' },
  { name: 'Tủ Kệ Tivi' },
  { name: 'Combo Basic' },
  { name: 'Vạn Thành' },
  { name: 'Full Combo' },
];
