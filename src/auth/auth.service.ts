import { Injectable } from '@nestjs/common';
import { SendOtpDto } from './dto/send-otp.dto';

@Injectable()
export class AuthService {
  sendOTP(body: SendOtpDto) {
    const { phone } = body;
    return { phone };
  }
}
