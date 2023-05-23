import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class CreateAddressDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  addressLine2: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  state: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  country: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @Field(() => String)
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
