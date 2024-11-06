import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel, CategorySchema } from './category.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:CategoryModel.name, schema:CategorySchema}])
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports:[CategoryService]
})
export class CategoryModule {}
