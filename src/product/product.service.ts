import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { parse } from 'node-html-parser';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly configService: ConfigService
  ) {}

  async getProductFromProductAPI(productId: string) {
    try {
      const resp = await axios.get(`${this.configService.get('PRODUCT_API_URL')}?product_id=${productId}`);
      return await resp.data?.[0];
    } catch (error) {
      return null;
    }
  }

  async getProductInventory(page: number = 1, limit: number = 20, search: string) {
    // TODO : Change this logic after getting gala gala API (THIS LOGIC IS FOR TESTING PURPOSE ONLY)

    let url: string = `${this.configService.get('PRODUCT_API_URL')}?_page=${page}&_limit=${limit}`;
    if (search) url += `&title_like=${search}`;

    const resp = await axios.get(url);
    const products = await resp.data;

    return products?.map((product) => {
      const parsedDescription = parse(product?.description)
        ?.querySelector('[data-element="main"]')
        ?.text.replace(/<\/?p>/g, ' ')
        ?.trim();
      return {
        convictionalProductId: product.product_id,
        name: product.title,
        description: parsedDescription ?? '',
        price: +product.price,
        slug: product.link.split('/shop/')?.[1]?.split('.html')?.[0],
        url: product.link,
        imageUrl: product.image_link
      };
    });
  }

  async getProductById(id: string) {
    const foundProduct = await this.productRepository.findOneBy({ id, isDeleted: false, isActive: true });
    if (!foundProduct) throw new NotFoundException(`Product with id ${id} not found`);
    return foundProduct;
  }

  async createProduct(createProductDto: Partial<CreateProductDto>) {
    const existingProduct = await this.productRepository.findOneBy({
      convictionalProductId: createProductDto.convictionalProductId
    });

    if (existingProduct) return existingProduct;

    const product = await this.getProductFromProductAPI(createProductDto.convictionalProductId);
    if (product) {
      const parsedDescription = parse(product.description)
        ?.querySelector('[data-element="main"]')
        ?.text.replace(/<\/?p>/g, ' ')
        ?.trim();

      const newProduct = this.productRepository.create({
        ...createProductDto,
        convictionalProductId: product.product_id,
        name: product.title,
        description: parsedDescription ?? '',
        price: +product.price,
        slug: product.link.split('/shop/')?.[1].split('.html')?.[0],
        url: product.link,
        imageUrl: product.image_link
      });
      return await this.productRepository.save(newProduct);
    } else {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    }
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id: productId, isDeleted: false, isActive: true });
    if (!product) throw new NotFoundException('Product not found');
    return await this.productRepository.save({ ...product, ...updateProductDto });
  }

  async deleteProduct(productId: string) {
    const product = await this.productRepository.findOneBy({ id: productId, isDeleted: false, isActive: true });
    if (!product) throw new NotFoundException('Product not found');
    return await this.productRepository.save({ ...product, isDeleted: true, isActive: false });
  }
}
