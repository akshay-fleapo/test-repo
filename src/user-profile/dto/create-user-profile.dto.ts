import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserProfileDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  avatarUrl: string;

  @Field()
  @IsOptional()
  @IsString()
  pageName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsOptional()
  @IsString()
  theme: string;

  @Field()
  @IsOptional()
  @IsString()
  backgroundColor: string;

  @Field()
  @IsOptional()
  @IsString()
  textColor: string;

  @Field()
  @IsOptional()
  @IsString()
  backgroundImageUrl: string;
}
