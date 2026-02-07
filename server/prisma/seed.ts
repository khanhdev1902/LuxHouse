import { seedCategories, seedProducts, seedUsers } from './seeds';
import { PrismaService } from 'src/prisma.service';

const prisma = new PrismaService();

async function bootstrap() {
  await seedUsers(prisma);
  await seedCategories(prisma);
  await seedProducts(prisma);
}

bootstrap()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
