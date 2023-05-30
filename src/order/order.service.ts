import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, order_status } from './entity/order.entity';
import { FindOperator, Repository } from 'typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async getAllMyOrders(user: IJwtPayload) {
    return await this.orderRepository.find({
      where: { gifter: { id: user.id }, isDeleted: false }
    });
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id, isDeleted: false, isActive: true },
      relations: ['gifter', 'address']
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async getMyReceivedGift(user: IJwtPayload) {
    const giftOrder = await this.orderRepository.find({
      where: { creator: { id: user.id }, status: order_status.completed },
      relations: ['gifter', 'address']
    });

    if (giftOrder.length == 0) {
      throw new NotFoundException('Gift not found');
    }
    return giftOrder;
  }

  async createOrder(user: IJwtPayload, createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create({
      orderType: createOrderDto.orderType,
      total: createOrderDto.total,
      slug: createOrderDto.slug,
      url: createOrderDto.url,
      paymentMethod: createOrderDto.paymentMenthod,
      stripePaymentId: createOrderDto.stripePaymentId,
      gifter: { id: user.id },
      creator: { id: createOrderDto.creatorId },
      address: { id: createOrderDto.address }
    });
    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  async deleteOrder(user: IJwtPayload, id: string) {
    const order = await this.orderRepository.findOne({ where: { id, gifter: { id: user.id }, isDeleted: false } });
    if (!order) throw new NotFoundException('Order not found');
    return await this.orderRepository.save({ ...order, isDeleted: true, isActive: false });
  }
}
