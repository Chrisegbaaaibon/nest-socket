import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { IServiceResponse } from 'src/common/interfaces/http-response.interface';
import { generateToken } from 'src/utils/token.util';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerDto: RegisterDto): Promise<IServiceResponse> {
    try {
      console.log(registerDto);
      const email = registerDto.email;
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new BadRequestException('User already exists');
      }
      const password = registerDto.password;
      const hashedPassword = await hash(password);
      const newUser = await this.userModel.create({
        ...registerDto,
        password: hashedPassword,
      });
      const tokens = await generateToken(newUser);
      return {
        data: tokens,
      };
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async login(loginDto: LoginDto): Promise<IServiceResponse> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await verify(user.password, loginDto.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await generateToken(user);
    return {
      data: tokens,
    };
  }
}
