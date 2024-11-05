import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class NewJobDto {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    employer: string

    @IsString()
    @IsNotEmpty()
    employee: string

    @IsNotEmpty()
    @IsNumber()
    price: number
}