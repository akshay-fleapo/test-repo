import { IsNumber, IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber('US')
  @IsNumber()
  phone: string;
}
