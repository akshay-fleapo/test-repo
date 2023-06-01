import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Raw, Repository } from 'typeorm';
import { CreateWishlistItemsDto } from './dto/create-wishlist-items.dto';
import { WishlistItems } from './entity/wishlist-items.entity';
import { UpdateWishlistItemsDto } from './dto/update-wishlist-items.dto';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';

@Injectable()
export class WishlistItemsService {
  constructor(
    @InjectRepository(WishlistItems)
    private readonly wishlistItemsRepository: Repository<WishlistItems>,
    private readonly productService: ProductService
  ) {}

  async getAllWishlistItemsByWishlistId(
    user: boolean | IJwtPayload,
    wishlistId: string,
    priceHL: boolean,
    priceLH: boolean,
    title: string
  ) {
    const foundItems = await this.wishlistItemsRepository.find({
      where: {
        wishlist: { id: wishlistId, ...(!user && { isActive: true }) },
        product: {
          name: title && Raw((alias) => `${alias} ILIKE '%${title}%'`),
          ...(!user && { isActive: true })
        }
      },
      relations: { product: true, wishlist: true },
      order: {
        product: { price: priceHL ? 'DESC' : priceLH ? 'ASC' : undefined }
      }
    });
    if (!foundItems) throw new NotFoundException(`Wishlist items with wishlistId ${wishlistId} not found`);
    return foundItems;
  }

  async createWishlistItem(createWishlistItemsDto: CreateWishlistItemsDto) {
    const { wishlistId, productId } = createWishlistItemsDto;

    const createdProduct = await this.productService.createProduct({ convictionalProductId: productId });

    const foundItem = await this.wishlistItemsRepository.findOne({
      where: { wishlist: { id: wishlistId }, product: { id: createdProduct.id } }
    });
    if (foundItem)
      throw new NotFoundException(
        `Wishlist item with wishlistId ${wishlistId} and productId ${productId} already exists`
      );

    const newItem = await this.wishlistItemsRepository.create({
      ...createWishlistItemsDto,
      wishlist: { id: wishlistId },
      product: { id: createdProduct.id }
    });

    return await this.wishlistItemsRepository.save(newItem);
  }

  async createFeaturedWishlistItemsById(wishlistId: string, createFeaturedWishlistItemsById: UpdateWishlistItemsDto) {
    const wishlist = await this.wishlistItemsRepository.findOne({ where: { id: wishlistId } });
    if (!wishlist) throw new NotFoundException('Wishlist Item not found');

    return await this.wishlistItemsRepository.save({ ...wishlist, ...createFeaturedWishlistItemsById });
  }

  async getAllFeaturedWishlistItems() {
    const foundItems = await this.wishlistItemsRepository.find({
      where: { isFeatured: true },
      relations: { product: true, wishlist: true }
    });

    if (!foundItems) throw new NotFoundException(`featured items not found`);
    return foundItems;
  }
}
