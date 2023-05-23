import { Module } from '@nestjs/common';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entity/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistResolver, WishlistService]
})
export class WishlistModule {}
