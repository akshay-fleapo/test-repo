import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";


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
    payment_menthod: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    stripe_payment_id: string;

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
