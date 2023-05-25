import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  @IsOptional()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;


  @Field()
  @IsString()
  @IsOptional()
  imageUrl: string;

  @Field()
  @IsNumber()
  @IsOptional()
  price: number;

  @Field()
  @IsString()
  @IsOptional()
  slug: string;

  @Field()
  @IsString()
  @IsOptional()
  url: string;

  @Field()
  @IsString()
  @IsOptional()
  convictionalProductId: string;
}
