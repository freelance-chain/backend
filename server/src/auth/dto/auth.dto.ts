import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Roles } from "src/user/interface/user.interface";


export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsOptional()
    @IsString()
    role?: Roles

    @IsOptional()
    @IsString()
    profilePicture?: string

    @IsOptional()
    @IsString()
    walletAddress?: string

    @IsOptional()
    @IsString()
    about?: string

    @IsOptional()
    @IsString()
    cotunry?: string

    @IsOptional()
    @IsString()
    city?: string

    @IsOptional()
    @IsArray()
    languages?: [{ languageName: string; level: string; }]

    @IsOptional()
    @IsArray()
    skills?: [string];


}