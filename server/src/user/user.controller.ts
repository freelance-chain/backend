import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        return await this.userService.getUserById(userId)
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId:string, updateUserDto:UpdateUserDto) {
        return await this.userService.updateUser(userId,updateUserDto)
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId:string) {
        return await this.userService.deleteUser(userId)
    }
}
