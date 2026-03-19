import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://192.168.1.38:5173',
      'http://localhost:4173',
      'https://luxhouse.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // xóa những trường dư
      // forbidNonWhitelisted: true, //chặn những data truyền dư trường
      transform: true, // fomat cho chuẩn dataDTO
    }),
  );

  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
