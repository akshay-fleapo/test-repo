import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Wishlist } from './entity/wishlist.entity';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistResolver, WishlistService , JwtService]
})
export class WishlistModule {}
