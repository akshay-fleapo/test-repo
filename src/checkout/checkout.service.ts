import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Checkout } from './entity/checkout.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Injectable()

export class CheckoutService {
    constructor(
        @InjectRepository(Checkout)
        private readonly checkoutRepository: Repository<Checkout>
    ) { }

    async getCheckout(user: IJwtPayload) {
        const foundCheckouts = await this.checkoutRepository.findOne({
            where: { gifter: { id: user.id } },
            relations: ['user']
        });
        return foundCheckouts
    }


    async createCheckout(user: IJwtPayload, createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
        const {productId }= createCheckoutDto;
        const foundData = await this.checkoutRepository.findOne({
            where: { gifter: { id: user.id }, product: { id: productId } }
        });
        if (foundData)
            throw new NotFoundException(
                `Wishlist item with wishlistId ${user.id} and productId ${productId} already exists`
            );

        const checkoutItem = await this.checkoutRepository.create({
            ...createCheckoutDto,
            gifter: { id: user.id },
            product: {id: productId}
        });
        return await this.checkoutRepository.save(checkoutItem);
    }
}