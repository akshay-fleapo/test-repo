import { Module } from '@nestjs/common';
import { Address } from './entity/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressResolver, AddressService],
  exports: []
})
export class AddressModule {}
