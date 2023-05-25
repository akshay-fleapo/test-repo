import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";

@InputType()
export class CreateCheckoutDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @Field(() => String)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @Field(() => String)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

}