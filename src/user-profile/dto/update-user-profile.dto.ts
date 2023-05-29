import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserProfileDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatarUrl: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  pageName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  theme: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  backgroundColor: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  textColor: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  backgroundImageUrl: string;

  @Field()
  @IsOptional()
  @IsString()
  stripeCustomerId: string;
}
