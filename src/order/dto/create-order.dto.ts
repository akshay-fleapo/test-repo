import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { gift_as, order_status, order_type, payment_status } from '../entity/order.entity';

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
  status: order_status;

  @Field()
  paymentStatus: payment_status;

  @Field()
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  stripePaymentId: string;

  @Field()
  orderType: order_type;

  @Field()
  giftAs: gift_as;

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
