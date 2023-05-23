import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entity/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>
  ) {}

  async getAllWishlist(user: IJwtPayload) {
    return await this.wishlistRepository.find({
      where: { user: { id: user.id }, isDeleted: false },
      relations: ['user', 'address']
    });
  }

  async getWishlistByAddressId(user: IJwtPayload, addressId: string) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { address: { id: addressId }, user: { id: user.id }, isDeleted: false },
      relations: ['user', 'address']
    });
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    return wishlist;
  }

  async createWishlist(user: IJwtPayload, createWishlistDto: CreateWishlistDto) {
    const wishlist = await this.wishlistRepository.create({
      ...createWishlistDto,
      user: { id: user.id },
      address: { id: createWishlistDto.address }
    });
    return await this.wishlistRepository.save(wishlist);
  }

  async updateWishlist(user: IJwtPayload, id: string, updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.wishlistRepository.findOne({ where: { id, user: { id: user.id }, isDeleted: false } });
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    return await this.wishlistRepository.save({
      ...wishlist,
      ...updateWishlistDto,
      address: updateWishlistDto.address ? { id: updateWishlistDto.address } : wishlist.address
    });
  }

  async deleteWishlist(user: IJwtPayload, id: string) {
    const wishlist = await this.wishlistRepository.findOne({ where: { id, user: { id: user.id }, isDeleted: false } });
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    return await this.wishlistRepository.save({ ...wishlist, isDeleted: true, isActive: false });
  }
}
