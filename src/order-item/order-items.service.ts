import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItems } from './entity/order-items.entity';
import { Not, Repository } from 'typeorm';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>
  ) {}

  async getOrderItemById(id: string) {
    const foundItem = await this.orderItemsRepository.findOne({ where: { id }, relations: ['product', 'order'] });
    if (!foundItem) throw new NotFoundException(`Order item with id ${id} not found`);
    return foundItem;
  }

  async getAllOrderItemsByOrderId(orderId: string) {
    const foundItems = await this.orderItemsRepository.find({
      where: { order: { id: orderId } },
      relations: ['product', 'order']
    });
    if (!foundItems) throw new NotFoundException(`Order items with Order ${orderId} not found`);
    return foundItems;
  }

  async createOrderItem(createOrderItemsDto: CreateOrderItemsDto) {
    const { orderId, productId } = createOrderItemsDto;
    const foundItem = await this.orderItemsRepository.findOne({
      where: { order: { id: orderId }, product: { id: productId } }
    });
    if (foundItem)
      throw new NotFoundException(`Order item with orderId ${orderId} and productId ${productId} already exists`);
    const newItem = await this.orderItemsRepository.create({
      ...createOrderItemsDto,
      order: { id: orderId },
      product: { id: productId }
    });

    return await this.orderItemsRepository.save(newItem);
  }
}
