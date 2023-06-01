import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { OrderItems } from './entity/order-items.entity';
import { OrderItemsService } from './order-items.service';

@Resolver()
export class OrderItemsResolver {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Query(() => OrderItems)
  async getOrderItemsById(@Args('id', { type: () => String }) id: string) {
    return await this.orderItemsService.getOrderItemById(id);
  }

  @Query(() => [OrderItems])
  async getAllOrderItemsByOrderId(@Args('orderId', { type: () => String }) orderId: string) {
    return await this.orderItemsService.getAllOrderItemsByOrderId(orderId);
  }

  @Mutation(() => OrderItems)
  async createOrderItem(@Args('orderItemsInput') createOrderItemsDto: CreateOrderItemsDto) {
    return await this.orderItemsService.createOrderItem(createOrderItemsDto);
  }
}
