/* eslint-disable @typescript-eslint/no-unused-vars */
import { seedCategories, seedProducts, seedUsers } from './seeds';
import { PrismaService } from 'src/prisma.service';
import { seedAttributes } from './seeds/attributes.seed';

const prisma = new PrismaService();

async function bootstrap() {
  // await seedUsers(prisma);
  // await seedCategories(prisma);
  // await seedAttributes(prisma);
  await seedProducts(prisma);
}

bootstrap()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
