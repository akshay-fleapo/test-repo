import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  sendOTP(@Body() body: SendOtpDto) {
    const data = this.authService.sendOTP(body);
    return data;
  }
}
