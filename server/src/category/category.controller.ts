import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { Types } from 'mongoose';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        const newCategory = await this.categoryService.createCategory(createCategoryDto);
        return new ApiResponseDto(true, { category: newCategory });
    }

    @Get()
    async getCategories() {
        const categories = await this.categoryService.getCategories();

        return new ApiResponseDto(true, categories);
    }

    @Get(':categoryId')
    async getCategoryById(@Param('categoryId') categoryId:Types.ObjectId) {
        const category = await this.categoryService.getCategoryById(categoryId);

        return new ApiResponseDto(true, category);
    }


    @Put(':categoryId')
    async updateCategory(@Param('categoryId') categoryId:Types.ObjectId, @Body() updateCategoryDto:UpdateCategoryDto) {
        const result = await this.categoryService.updateCategory(categoryId,updateCategoryDto)

        return new ApiResponseDto(true, result);
    }

    @Delete(':categoryId')
    async deleteCategory(@Param('categoryId') categoryId:Types.ObjectId) {
        const result = await this.categoryService.deleteCategory(categoryId)

        return new ApiResponseDto(true, result);
    }
}
