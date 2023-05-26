import { Module } from '@nestjs/common';
import { OrderItemsResolver } from './order-items.resolver';
import { OrderItemsService } from './order-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from './entity/order-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItems])],
  providers: [OrderItemsResolver, OrderItemsService]
})
export class OrderItemsModule {}
