import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService],
})
export class CategoryModule {}
