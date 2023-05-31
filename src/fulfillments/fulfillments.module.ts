import { Module } from '@nestjs/common';
import { FulfillmentsResolver } from './fulfillments.resolver';
import { FulfillmentsService } from './fulfillments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fulfillments } from './entity/fulfillments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fulfillments])],
  providers: [FulfillmentsResolver, FulfillmentsService]
})
export class FulfillmentsModule {}
