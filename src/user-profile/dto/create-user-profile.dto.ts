import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @IsString()
  pageName: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  theme: string;

  @IsOptional()
  @IsString()
  backgroundColor: string;

  @IsOptional()
  @IsString()
  textColor: string;

  @IsOptional()
  @IsString()
  backgroundImageUrl: string;
}
