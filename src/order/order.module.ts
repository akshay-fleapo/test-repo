import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Order])],
  providers: [OrderResolver, OrderService, JwtService],
  exports: []
})
export class OrderModule {}
