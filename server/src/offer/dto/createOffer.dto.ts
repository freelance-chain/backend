import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { OfferStatus } from "../interface/offer.interface";

export class CreateOfferDto {
    @IsString()
    @IsNotEmpty()
    jobId: Types.ObjectId

    @IsString()
    @IsNotEmpty()
    userId: Types.ObjectId

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsString()
    @IsNotEmpty()
    description:string

    @IsOptional()
    @IsString()
    status: OfferStatus
}