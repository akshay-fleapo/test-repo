import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { GqlAuthGuard } from 'src/auth/guards';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entity/address.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private addressService: AddressService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Address])
  async getAllAddress(@CurrentUser() user: IJwtPayload) {
    return this.addressService.getAllAddress(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Address)
  async getAddressById(@CurrentUser() user: IJwtPayload, @Args('id') id: string) {
    return this.addressService.getAddressById(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address)
  async createAddress(
    @CurrentUser() user: IJwtPayload,
    @Args('createAddressInput') createAddressDto: CreateAddressDto
  ) {
    return this.addressService.createAddress(user, createAddressDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address)
  async updateAddress(
    @CurrentUser() user: IJwtPayload,
    @Args('id') id: string,
    @Args('updateAddressInput') updateAddressDto: UpdateAddressDto
  ) {
    return this.addressService.updateAddress(user, id, updateAddressDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address)
  async deleteAddress(@CurrentUser() user: IJwtPayload, @Args('id') id: string) {
    return this.addressService.deleteAddress(user, id);
  }
}
