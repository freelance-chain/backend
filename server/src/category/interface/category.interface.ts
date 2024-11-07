import { Types } from "mongoose";

export interface Category {
    parentCategory: Types.ObjectId,
    name: string,
    description: string,
    isActive:boolean,
}