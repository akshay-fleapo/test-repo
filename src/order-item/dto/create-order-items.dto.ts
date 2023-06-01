import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateOrderItemsDto {
  @Field(() => String)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @Field(() => String)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
