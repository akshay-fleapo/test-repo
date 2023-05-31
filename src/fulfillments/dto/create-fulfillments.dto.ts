import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { EFulfillmentStatus } from '../entity/fulfillments.entity';

@InputType()
export class CreateFulfillmentsDto {
  @IsEnum(EFulfillmentStatus)
  @IsNotEmpty()
  @Field(() => EFulfillmentStatus)
  status: EFulfillmentStatus;

  @Field(() => String)
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  orderId: string;
}
