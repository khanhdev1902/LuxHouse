import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcryptjs';
export async function seedUsers(prisma: PrismaService) {
  for (const user of Users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        role: 'ADMIN',
      },
      create: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: hashedPassword,
      },
    });
    console.log(`Seeded user: ${user.email}`);
  }
  console.log('Seed users successfully');
}

const Users = [
  {
    name: 'Astrol',
    phone: '0345755059',
    email: 'astrol@gmail.com',
    password: '1902@Astrol',
  },
];
