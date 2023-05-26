import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) { }

  async getAllMyOrders(user: IJwtPayload) {
    return await this.orderRepository.find({
      where: { gifter: { id: user.id }, isDeleted: false },
    });
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id, isDeleted: false, isActive: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async createOrder(user: IJwtPayload, createOrderDto: CreateOrderDto) {
    const { creatorId, address } = createOrderDto
    }

}

