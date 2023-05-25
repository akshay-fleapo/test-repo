import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProductDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  price: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  slug: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  url: string;

}
