import { Module } from '@nestjs/common';
import { WishlistItemsResolver } from './wishlist-items.resolver';
import { WishlistItemsService } from './wishlist-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistItems } from './entity/wishlist-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItems])],
  providers: [WishlistItemsResolver, WishlistItemsService]
})
export class WishlistItemsModule {}
