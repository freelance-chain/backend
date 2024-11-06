import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    parentCategory: string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsOptional()
    @IsBoolean()
    isActive:boolean
}