import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateWishlistItemsDto } from './dto/create-wishlist-items.dto';
import { WishlistItems } from './entity/wishlist-items.entity';
import { WishlistItemsService } from './wishlist-items.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards';
import { BasicGuard } from 'src/auth/guards/basic-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateWishlistItemsDto } from './dto/update-wishlist-items.dto';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';

@Resolver()
export class WishlistItemsResolver {
  constructor(private readonly wishlistItemsService: WishlistItemsService) {}

  // Here I'am checking if the user is logged in or not, Coz this route is public
  @UseGuards(BasicGuard)
  @Query(() => [WishlistItems])
  async getAllWishlistItemsByWishlistId(
    @CurrentUser() user: boolean | IJwtPayload,
    @Args('wishlistId', { type: () => String }) wishlistId: string,
    @Args('priceHL', { type: () => Boolean, nullable: true }) priceHL: boolean,
    @Args('priceLH', { type: () => Boolean, nullable: true }) priceLH: boolean,
    @Args('title', { type: () => String, nullable: true }) title: string
  ) {
    return await this.wishlistItemsService.getAllWishlistItemsByWishlistId(user, wishlistId, priceHL, priceLH, title);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WishlistItems)
  async createWishlistItem(@Args('wishlistItemsInput') createWishlistItemsDto: CreateWishlistItemsDto) {
    return await this.wishlistItemsService.createWishlistItem(createWishlistItemsDto);
  }

  @Mutation(() => WishlistItems)
  async createFeaturedWishlistItemsById(
    @Args('wishlistId') id: string,
    @Args('createFeaturedWishlistById') createFeaturedWishlistItemsById: UpdateWishlistItemsDto
  ) {
    return await this.wishlistItemsService.createFeaturedWishlistItemsById(id, createFeaturedWishlistItemsById);
  }

  @Query(() => [WishlistItems])
  async getAllFeaturedWishlistItems() {
    return await this.wishlistItemsService.getAllFeaturedWishlistItems();
  }
}
