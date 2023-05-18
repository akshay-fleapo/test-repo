import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

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
  verify(@Body() body: VerifyOtpDto) {
    const data = this.authService.verifyOTP(body);
    return data;
  }
}
