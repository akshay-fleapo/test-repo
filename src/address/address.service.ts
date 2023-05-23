import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Not, Repository } from 'typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  async getAllAddress(user: IJwtPayload) {
    return this.addressRepository.find({ where: { user: { id: user.id }, isDeleted: false }, relations: ['user'] });
  }

  async getAddressById(user: IJwtPayload, id: string) {
    const address = await this.addressRepository.findOne({ where: { id, user: { id: user.id }, isDeleted: false } });
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }

  async createAddress(user: IJwtPayload, createAddressDto: CreateAddressDto) {
    if (createAddressDto.isDefault) {
      const address = await this.addressRepository.findOne({
        where: { user: { id: user.id }, isDeleted: false, isDefault: true }
      });
      if (address) {
        address.isDefault = false;
        await this.addressRepository.save(address);
      }
    }
    const address = this.addressRepository.create({
      ...createAddressDto,
      user: { id: user.id },
      isDefault: createAddressDto.isDefault ? createAddressDto.isDefault : false
    });
    return this.addressRepository.save(address);
  }

  async updateAddress(user: IJwtPayload, id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({ where: { id, user: { id: user.id }, isDeleted: false } });
    if (!address) throw new NotFoundException('Address not found');
    if (updateAddressDto.isDefault) {
      const defaultAddress = await this.addressRepository.findOne({
        where: { user: { id: user.id }, isDeleted: false, isDefault: true }
      });
      if (defaultAddress) {
        defaultAddress.isDefault = false;
        await this.addressRepository.save(defaultAddress);
      }
    }
    return this.addressRepository.save({ ...address, ...updateAddressDto });
  }

  async deleteAddress(user: IJwtPayload, id: string) {
    const address = await this.addressRepository.findOne({ where: { id, user: { id: user.id }, isDeleted: false } });
    if (!address) throw new NotFoundException('Address not found');
    return this.addressRepository.save({ ...address, isDeleted: true });
  }
}
