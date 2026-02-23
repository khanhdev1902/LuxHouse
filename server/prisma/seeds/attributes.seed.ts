import { PrismaService } from 'src/prisma.service';

const allAttributes = [
  { name: 'Color' },
  { name: 'Size' },
  { name: 'Material' },
];

export const seedAttributes = async (prisma: PrismaService) => {
  for (const attribute of allAttributes) {
    await prisma.attribute.upsert({
      where: { name: attribute.name },
      update: {},
      create: attribute,
    });
  }
  console.log('Seeded attributes successfully');
};
