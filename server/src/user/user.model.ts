import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { Roles, User } from "./interface/user.interface";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class UserModel implements User {
    @Prop({
        unique: true
    })
    email: string

    @Prop()
    password: string

    @Prop()
    role: Roles

    @Prop()
    profilePicture: string;
    
    @Prop()
    walletAddress: string;
    
    @Prop()
    about: string;
    
    @Prop()
    country: string;
    
    @Prop()
    city: string;
    
    @Prop()
    languages: [{ languageName: string; level: string; }];
    
    @Prop()
    skills: [string];
}


export const UserSchema = SchemaFactory.createForClass(UserModel);