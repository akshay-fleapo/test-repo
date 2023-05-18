import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        accountSid: config.get('TWILIO_ACCOUNT_SID'),
        authToken: config.get('TWILIO_AUTH_TOKEN')
      }),
      inject: [ConfigService]
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
