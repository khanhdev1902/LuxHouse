import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse, ApiResponseType } from 'src/common/base/api-response';

@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getListCategory(): Promise<ApiResponseType<unknown>> {
    const lstCategory = await this.categoryService.getListCategory();
    return ApiResponse.success(
      lstCategory,
      'Lấy danh sách danh mục thành công !',
      200,
    );
  }
}
