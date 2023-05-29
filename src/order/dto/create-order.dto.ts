import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { order_type } from '../entity/order.entity';

@InputType()
export class CreateOrderDto {
  @Field()
  @IsNotEmpty()
  total: number;

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
  paymentMenthod: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  stripePaymentId: string;

  @Field()
  @IsNotEmpty()
  orderType: order_type;

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
