import { Injectable } from '@nestjs/common';
import { SendOtpDto } from './dto/send-otp.dto';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService, private readonly tw: TwilioService) {}

  sendOTP(body: SendOtpDto) {
    const { phone } = body;
    this.tw.client.verify.v2.services(this.config.get('TWILIO_VERIFY_SERVICE_SID')).verifications.create({
      to: phone,
      channel: 'sms'
    });
    return { phone };
  }
}
