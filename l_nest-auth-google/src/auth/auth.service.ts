import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto) {
        const user = await this.userService.getUser(userDto.email);
        if(user) {
            throw new HttpException(
                '해당 유저가 이미 있습니다.',
                HttpStatus.BAD_REQUEST
            );
        }
        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);
        try {
            const user = await this.userService.createUser({
                ...userDto,
                password: encryptedPassword
            });
            user.password = undefined;
            return user;
        } catch(error) {
            throw new HttpException('서버 에러', 500);
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUser(email);
        if(!user) return null; // 유저가 없으면 검증 실패
        const { password: hashedPassword, ...userInfo } = user;
        // 패스워드가 일치하면 성공
        if(bcrypt.compareSync(password, hashedPassword)) {
            return userInfo;
        }
        return null;
    }
}