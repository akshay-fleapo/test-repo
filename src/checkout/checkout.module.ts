import { Module } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import { CheckoutResolver } from "./checkout.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Checkout } from "./entity/checkout.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Checkout])],
    providers: [CheckoutService, CheckoutResolver]
})
export class CheckoutModule {}