import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entity/wishlist.entity';
import { AuthService } from 'src/auth/auth.service';

// TODO : ASK isActive Problem statement ... IsActive Wishlist will be shown in the list or not and how it will be used

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist> // private readonly authService: AuthService
  ) {}

  async getAllWishlist(user: IJwtPayload) {
    return await this.wishlistRepository.find({
      where: { user: { id: user.id }, isDeleted: false },
      relations: ['user', 'address']
    });
  }

  async getWishlistsByUserId(user: boolean, userId: string) {
    return await this.wishlistRepository.find({
      where: { user: { id: userId }, isDeleted: false, ...(!user && { isActive: true }) },
      relations: ['user', 'address']
    });
  }

  async getWishlistById(id: string) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id, isDeleted: false, isActive: true },
      relations: ['user', 'address']
    });
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    return wishlist;
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
    console.log(createWishlistDto);
    const wishlist = await this.wishlistRepository.create({
      ...createWishlistDto,
      user: { id: user.id },
      address: { id: createWishlistDto.address }
    });
    return await this.wishlistRepository.save(wishlist);
  }

  async updateWishlist(user: IJwtPayload, id: string, updateWishlistDto: UpdateWishlistDto) {
    console.log('user', user.id);
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
