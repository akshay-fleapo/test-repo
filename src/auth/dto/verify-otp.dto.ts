import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  otp: string;
}
