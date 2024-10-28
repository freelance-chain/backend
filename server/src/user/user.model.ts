import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { Roles, User } from "./interface/user.interface";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class UserModel extends Document implements User {
    @Prop({
        unique: true,
        required: true
    })
    email: string

    @Prop({
        required: true
    })
    password: string

    @Prop({ default: Roles.User })
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
    skills: string[];
}


export const UserSchema = SchemaFactory.createForClass(UserModel);