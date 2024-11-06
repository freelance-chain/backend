import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel } from './category.model';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(CategoryModel.name) private readonly categoryModel: Model<CategoryModel>
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryModel> {
        const newCategory = await new this.categoryModel(createCategoryDto).save();

        return newCategory;
    }

    async getCategories(): Promise<CategoryModel[]> {
        const categories = await this.categoryModel.find().exec();

        return categories
    }

    async getCategoryById(categoryId: Types.ObjectId): Promise<CategoryModel> {
        const category = await this.categoryModel.findById(categoryId)

        if (!category) {
            throw new HttpException(new ErrorResponseDto('Category not found!', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }

        return category;
    }

    async updateCategory(categoryId:Types.ObjectId, updateCategoryDto:UpdateCategoryDto):Promise<CategoryModel> {
        const category = (await this.categoryModel.findByIdAndUpdate(categoryId,updateCategoryDto)).save();

        if (!category) {
            throw new HttpException(new ErrorResponseDto('Category not found!', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }

        return category;
    }

    async deleteCategory(categoryId:Types.ObjectId):Promise<any> {
        const category = await this.categoryModel.findByIdAndDelete(categoryId);

        if (!category) {
            throw new HttpException(new ErrorResponseDto('Category not found!', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }

        return {message:"Category successfully deleted!"}
    }
}
