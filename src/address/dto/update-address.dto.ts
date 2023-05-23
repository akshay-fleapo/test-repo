import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsPhoneNumber, IsPostalCode, IsString } from 'class-validator';

@InputType()
export class UpdateAddressDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  firstName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  lastName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  addressLine1: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  addressLine2: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  city: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  state: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  country: string;

  @Field(() => String, { nullable: true })
  @IsPostalCode()
  @IsOptional()
  zipCode: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
