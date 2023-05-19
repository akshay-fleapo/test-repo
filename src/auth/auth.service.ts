import { ForbiddenException, Injectable } from '@nestjs/common';
import { SendOtpDto } from './dto/send-otp.dto';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private readonly tw: TwilioService,
    private readonly userService: UserService
  ) {}

  async sendOTP(body: SendOtpDto) {
    const { phone } = body;
    try {
      await this.tw.client.verify.v2.services(this.config.get('TWILIO_VERIFY_SERVICE_SID')).verifications.create({
        to: phone,
        channel: 'sms'
      });
    } catch (e) {
      throw new ForbiddenException('OTP limit exceeded.');
    }
    return { phone };
  }

  async verifyOTP(body: VerifyOtpDto) {
    const { phone, otp } = body;
    try {
      const res = await this.tw.client.verify.v2
        .services(this.config.get('TWILIO_VERIFY_SERVICE_SID'))
        .verificationChecks.create({
          to: phone,
          code: otp
        });
      if (res.status !== 'approved') throw new Error();

      const user = this.userService.updateUser({ phone, isPhoneVerified: true });
      return user;
    } catch (e) {
      console.log(e);
      throw new ForbiddenException('Invalid OTP');
    }
  }
}
