import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { EFulfillmentStatus } from '../entity/fulfillments.entity';

@InputType()
export class UpdateFulfillmentsDto {
  @IsEnum(EFulfillmentStatus)
  @Field(() => EFulfillmentStatus, { nullable: true })
  status: EFulfillmentStatus;
}
