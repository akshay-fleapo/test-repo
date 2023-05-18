import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

enum EnvironmentType {
  Dev = 'development',
  Prod = 'production'
}

class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(EnvironmentType)
  NODE_ENV: EnvironmentType;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_TYPE: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PWD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PORT: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, { enableImplicitConversion: true });

  const errors = validateSync(finalConfig, { skipMissingProperties: true });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return finalConfig;
}
