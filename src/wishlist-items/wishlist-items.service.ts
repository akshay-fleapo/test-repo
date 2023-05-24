import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistItems } from './entity/wishlist-items.entity';
import { Not, Repository } from 'typeorm';
import { CreateWishlistItemsDto } from './dto/create-wishlist-items.dto';

@Injectable()
export class WishlistItemsService {
  constructor(
    @InjectRepository(WishlistItems)
    private readonly wishlistItemsRepository: Repository<WishlistItems>
  ) {}

  async getWishlistItemById(id: string) {
    const foundItem = await this.wishlistItemsRepository.findOne({ where: { id }, relations: ['product', 'wishlist'] });
    if (!foundItem) throw new NotFoundException(`Wishlist item with id ${id} not found`);
    return foundItem;
  }

  async getAllWishlistItemsByWishlistId(wishlistId: string) {
    const foundItems = await this.wishlistItemsRepository.find({
      where: { wishlist: { id: wishlistId } },
      relations: ['product', 'wishlist']
    });
    if (!foundItems) throw new NotFoundException(`Wishlist items with wishlistId ${wishlistId} not found`);
    return foundItems;
  }

  async createWishlistItem(createWishlistItemsDto: CreateWishlistItemsDto) {
    const { wishlistId, productId } = createWishlistItemsDto;
    const foundItem = await this.wishlistItemsRepository.findOne({
      where: { wishlist: { id: wishlistId }, product: { id: productId } }
    });
    if (foundItem)
      throw new NotFoundException(
        `Wishlist item with wishlistId ${wishlistId} and productId ${productId} already exists`
      );
    const newItem = await this.wishlistItemsRepository.create({
      ...createWishlistItemsDto,
      wishlist: { id: wishlistId },
      product: { id: productId }
    });

    return await this.wishlistItemsRepository.save(newItem);
  }
}
