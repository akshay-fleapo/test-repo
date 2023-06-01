import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class UpdateWishlistItemsDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFeatured: boolean;
}
