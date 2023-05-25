import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateWishlistItemsDto {
  @Field(() => String)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  wishlistId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  productId: string;
}
