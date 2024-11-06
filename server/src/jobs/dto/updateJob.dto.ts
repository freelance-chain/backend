import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateJobDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    budget: number

    @IsNotEmpty()
    @IsArray()
    skillsRequired: string[]

    @IsString()
    @IsNotEmpty()
    projectType: string

    @IsOptional()
    @IsString()
    desiredLevel?: string

    @IsOptional()
    @IsString()
    proposalDescription?: string

    @IsArray()
    @IsString()
    categoryIds: string[]
}