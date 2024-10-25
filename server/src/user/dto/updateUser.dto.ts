import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
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