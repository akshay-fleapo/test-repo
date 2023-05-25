import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateWishlistItemsDto } from './dto/create-wishlist-items.dto';
import { WishlistItems } from './entity/wishlist-items.entity';
import { WishlistItemsService } from './wishlist-items.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards';

@Resolver()
export class WishlistItemsResolver {
  constructor(private readonly wishlistItemsService: WishlistItemsService) {}

  @Query(() => WishlistItems)
  async getWishlistItemsById(@Args('id', { type: () => String }) id: string) {
    return await this.wishlistItemsService.getWishlistItemById(id);
  }

  @Query(() => [WishlistItems])
  async getAllWishlistItemsByWishlistId(
    @Args('wishlistId', { type: () => String }) wishlistId: string,
    @Args('priceHL', { type: () => Boolean, nullable: true }) priceHL: boolean,
    @Args('priceLH', { type: () => Boolean, nullable: true }) priceLH: boolean,
    @Args('title', { type: () => String, nullable: true }) title: string
  ) {
    return await this.wishlistItemsService.getAllWishlistItemsByWishlistId(wishlistId, priceHL, priceLH, title);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WishlistItems)
  async createWishlistItem(@Args('wishlistItemsInput') createWishlistItemsDto: CreateWishlistItemsDto) {
    return await this.wishlistItemsService.createWishlistItem(createWishlistItemsDto);
  }
}
