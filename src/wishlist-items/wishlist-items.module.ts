import { Module } from '@nestjs/common';
import { WishlistItemsResolver } from './wishlist-items.resolver';
import { WishlistItemsService } from './wishlist-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistItems } from './entity/wishlist-items.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItems]),TypeOrmModule.forFeature([Product])],
  providers: [WishlistItemsResolver, WishlistItemsService, ProductService]
})
export class WishlistItemsModule {}
