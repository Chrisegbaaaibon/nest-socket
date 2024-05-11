import { Body, Controller, Post, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IServiceResponse } from "src/common/interfaces/http-response.interface";
import { RegisterDto, LoginDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<IServiceResponse> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<IServiceResponse> {
        return this.authService.login(loginDto);
    }
}