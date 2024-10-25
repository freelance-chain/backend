import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
        const newUser = new this.userModel(createUserDto).save();

        return newUser;
    }

    async getUsers(): Promise<UserModel[]> {
        return await this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<UserModel> {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
        if (!user) {
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async deleteUser(id: string): Promise<any> {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
        }

        return { message: "User successfully deleted" };
    }


}
