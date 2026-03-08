import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getListCategory() {
    const lstCategory = await this.prisma.category.findMany({
      select: { name: true, slug: true },
    });
    return lstCategory;
  }
}
