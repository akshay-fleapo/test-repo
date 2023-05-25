import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async getProducts() {
    return await this.productService.getProductInventory();
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Mutation(() => Product)
  async updateProduct(@Args('id') id: string, @Args('updateProductInput') updateProductDto: UpdateProductDto) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
