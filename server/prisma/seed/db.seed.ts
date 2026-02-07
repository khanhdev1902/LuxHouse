// import { PrismaService } from 'src/prisma.service';
// import bcrypt from 'bcryptjs';
// const prisma = new PrismaService();
// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@gmail.com',
//       password: await bcrypt.hash('123456', 10),
//     },
//   });
//   console.log('Created user:', user);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
