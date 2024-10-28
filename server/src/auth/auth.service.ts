import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthResponse } from './interface/auth.interface';
import { isValidPassword } from 'src/utils/jwt.util';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { UserDocument } from 'src/user/user.model';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private config: ConfigService
    ) {

    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const user: UserDocument = await this.userService.getUserByEmail(loginDto.email);

        if (!user) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }

        const isMatch = await isValidPassword(loginDto.password, user.password);

        if (!isMatch) {
            throw new HttpException('Username or password does not match', HttpStatus.UNAUTHORIZED);
        }

        const tokens = await this.getTokens(String(user._id), user.role)

        return tokens;
    }

    async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
        const user: UserDocument = await this.userService.getUserByEmail(createUserDto.email);

        if (user) {
            throw new HttpException('This email already exists!', HttpStatus.CONFLICT);
        }

        const newUser: UserDocument = await this.userService.createUser(createUserDto)

        const tokens = await this.getTokens(String(newUser._id),user.role);

        return tokens;
    }


    private async getTokens(userId: string, userRole?: string): Promise<AuthResponse> {
        const jwtPayload = {
            sub: userId,
            role: userRole
        };

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
                expiresIn: '7d',
            })
        ])

        return {
            access_token,
            refresh_token
        }
    }
}
