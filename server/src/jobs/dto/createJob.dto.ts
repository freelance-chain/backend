import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
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
    employerWallet: string

    @IsString()
    @IsNotEmpty()
    projectType: string

    @IsOptional()
    @IsString()
    desiredLevel?: string

    @IsOptional()
    @IsString()
    proposalDescription?: string
}