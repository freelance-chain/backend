import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    role?: string

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

    @IsString()
    @IsArray()
    @IsOptional()
    languages?: [{
        languageName: string,
        level: string
    }]

    @IsString()
    @IsArray()
    @IsOptional()
    skills?: [string]

}