import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SendOtpDto {
  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
