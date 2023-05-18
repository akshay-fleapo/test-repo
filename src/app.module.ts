import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { validateConfig } from './config.validator';
import { UserModule } from './user/user.module';
import { TwilioModule } from 'nestjs-twilio';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      persistedQueries: false,
      introspection: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig
    }),
    AuthModule,

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<'postgres'>('DB_TYPE'),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PWD'),
        database: configService.get<string>('POSTGRES_DB_NAME'),
        logging: configService.get('NODE_ENV') === 'development' ? ['query', 'error'] : ['error'],
        synchronize: configService.get('NODE_ENV') === 'development' ? true : false,
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    }),
    UserModule,
    
  ]
})
export class AppModule {}
