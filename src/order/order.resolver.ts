import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards';
import { Order } from './entity/order.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Order])
    async getAllMyOrders(@CurrentUser() user: IJwtPayload) {
        return await this.orderService.getAllMyOrders(user);
    }

    @Query(() => Order)
    async getOrderById(@Args('id') id: string) {
        return await this.orderService.getOrderById(id);
    }

}
