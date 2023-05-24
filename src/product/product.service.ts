import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async getProducts() {
    // TODO : Add gala-gala products
    return await this.productRepository.find({ where: { isDeleted: false, isActive: true } });
  }

  async getProductById(id: string) {
    return await this.productRepository.findOneBy({ id, isDeleted: false, isActive: true });
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
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
