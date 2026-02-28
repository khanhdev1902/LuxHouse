import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/common/pipes/vadilation.pipe';
import { AuthRequestDto } from './auth.request.dto';
import { ApiResponse, ApiResponseType } from 'src/common/base/api-response';
import { ILoginResponse } from './auth.interface';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) request: AuthRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponseType<ILoginResponse>> {
    console.log('Login endpoint called');
    const auth = await this.authService.authenticate(request);

    res.cookie('refreshToken', auth.refreshToken, {
      httpOnly: true,
      secure: false, // production: true
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày (milliseconds)
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, ...result } = auth;
    return ApiResponse.ok(result, 'Login thành công!', 200);
  }
  @Post('register')
  async register(
    @Body(new ValidationPipe()) request: AuthRequestDto,
  ): Promise<ApiResponseType<string>> {
    console.log(request);
    const result = await this.authService.register(request);
    return ApiResponse.message(result, 201);
  }
}
