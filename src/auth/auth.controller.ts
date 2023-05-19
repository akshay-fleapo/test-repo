import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JWTAuthGuard } from './guards';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/otp')
  sendOTP(@Body() body: SendOtpDto) {
    const data = this.authService.sendOTP(body);
    return data;
  }

  @Post('/verify-otp')
  @HttpCode(200)
  verify(@Body() body: VerifyOtpDto) {
    const data = this.authService.verifyOTP(body);
    return data;
  }

  @UseGuards(JWTAuthGuard)
  @Post('/logout')
  logout(@Request() req) {
    return this.authService.logOut(req.user);
  }
}
