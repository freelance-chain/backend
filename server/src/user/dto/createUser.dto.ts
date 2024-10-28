import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Roles } from "../interface/user.interface";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    role?: Roles

    @IsString()
    @IsOptional()
    profilePicture?: string

    @IsString()
    @IsOptional()
    walletAddress?: string

    @IsString()
    @IsOptional()
    country?: string

    @IsString()
    @IsOptional()
    city?: string

    @IsArray()
    @IsOptional()
    languages?: [{
        languageName: string,
        level: string
    }]

    @IsArray()
    @IsOptional()
    skills?: string[]

}