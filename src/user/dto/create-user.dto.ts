import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @Field(() => Boolean)
  @IsOptional()
  isPhoneVerified: boolean;
}
