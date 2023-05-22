import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @IsString()
  pageName: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsOptional()
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
