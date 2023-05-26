import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateOrderDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  total: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  url: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  status: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  payment_menthod: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  stripe_payment_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  order_type: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  gift_as: string;

  @Field(() => String)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  address: string;
}
