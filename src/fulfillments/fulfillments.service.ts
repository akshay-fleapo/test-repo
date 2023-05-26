import { CreateFulfillmentsDto } from './dto/create-fulfillments.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Fulfillments } from './entity/fulfillments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FulfillmentsService {
  constructor(
    @InjectRepository(Fulfillments)
    private readonly fulfillmentRepository: Repository<Fulfillments>
  ) {}

  async getFulfillmentById(id: string) {
    const fulfillment = await this.fulfillmentRepository.findOne({
      where: { id: id },
      relations: ['order']
    });
    if (!fulfillment) throw new NotFoundException('Fulfillment not found');
    return fulfillment;
  }

  async createFulfillment(createFulfillmentsDto: CreateFulfillmentsDto) {
    const fulfillment = this.fulfillmentRepository.create({
      ...createFulfillmentsDto,
      order: { id: createFulfillmentsDto.orderId }
    });
    return this.fulfillmentRepository.save(fulfillment);
  }

  async getFulfillmentByOrderId(orderId: string) {
    const fulfillment = await this.fulfillmentRepository.findOneBy({ order: { id: orderId } });
    if (!fulfillment) throw new NotFoundException('Fulfillment not found');
    return fulfillment;
  }
}
