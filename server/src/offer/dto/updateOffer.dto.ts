import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { OfferStatus } from "../interface/offer.interface";

export class UpdateOfferDto {
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