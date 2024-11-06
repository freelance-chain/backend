import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Category } from "./interface/category.interface";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class CategoryModel extends Document implements Category {
    @Prop({ required: false, ref: 'CategoryModel' })
    parentCategory: Types.ObjectId;

    @Prop({ required: true, unique:true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: false })
    isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel)