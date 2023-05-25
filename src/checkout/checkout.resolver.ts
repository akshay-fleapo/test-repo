import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Checkout } from './entity/checkout.entity';
import { CheckoutService } from './checkout.service';
import { GqlAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Resolver(() => Checkout)
export class CheckoutResolver {
  constructor(private readonly checkOutService: CheckoutService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Checkout)
  async getCheckout(@CurrentUser() user: IJwtPayload) {
    return this.checkOutService.getCheckout(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Checkout)
  async createCheckout(
    @CurrentUser() user: IJwtPayload,
    @Args('createCheckoutInput') createCheckoutDto: CreateCheckoutDto
  ) {
    return this.checkOutService.createCheckout(user, createCheckoutDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Checkout)
  async deleteCheckout(@CurrentUser() user: IJwtPayload, @Args('id') id: string) {
    return await this.checkOutService.deleteCheckout(user, id);
  }
}
