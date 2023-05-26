import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FulfillmentsService } from './fulfillments.service';
import { Fulfillments } from './entity/fulfillments.entity';
import { CreateFulfillmentsDto } from './dto/create-fulfillments.dto';

@Resolver(() => Fulfillments)
export class FulfillmentsResolver {
  constructor(private readonly fulfillmentsService: FulfillmentsService) {}

  @Query(() => Fulfillments)
  async getFulfillmentById(@Args('id', { type: () => String }) id: string) {
    return this.fulfillmentsService.getFulfillmentById(id);
  }

  @Query(() => Fulfillments)
  async getFulfillmentByOrderId(@Args('orderId', { type: () => String }) orderId: string) {
    return this.fulfillmentsService.getFulfillmentByOrderId(orderId);
  }

  @Mutation(() => Fulfillments)
  async createFulfillment(@Args('createFulfillmentsInput') createFulfillmentsDto: CreateFulfillmentsDto) {
    return this.fulfillmentsService.createFulfillment(createFulfillmentsDto);
  }
}
