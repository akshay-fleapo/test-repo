import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsBoolean()
  isEmailVerified: boolean;

  @IsBoolean()
  isPhoneVerified: boolean;
}
