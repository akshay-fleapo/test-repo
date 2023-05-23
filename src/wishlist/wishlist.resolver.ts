import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { GqlAuthGuard } from 'src/auth/guards';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entity/wishlist.entity';
import { WishlistService } from './wishlist.service';

@Resolver()
export class WishlistResolver {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Wishlist])
  async getAllWishlist(@CurrentUser() user: IJwtPayload) {
    return await this.wishlistService.getAllWishlist(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Wishlist)
  async getWishlistByAddressId(@CurrentUser() user: IJwtPayload, @Args('addressId') addressId: string) {
    return await this.wishlistService.getWishlistByAddressId(user, addressId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wishlist)
  async createWishlist(
    @CurrentUser() user: IJwtPayload,
    @Args('createWishlistInput') createWishlistDto: CreateWishlistDto
  ) {
    return await this.wishlistService.createWishlist(user, createWishlistDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wishlist)
  async updateWishlist(
    @CurrentUser() user: IJwtPayload,
    @Args('id') id: string,
    @Args('updateWishlistInput') updateWishlistDto: UpdateWishlistDto
  ) {
    return await this.wishlistService.updateWishlist(user, id, updateWishlistDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wishlist)
  async deleteWishlist(@CurrentUser() user: IJwtPayload, @Args('id') id: string) {
    return await this.wishlistService.deleteWishlist(user, id);
  }
}
