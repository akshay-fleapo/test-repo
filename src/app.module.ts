import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [UsersModule, AuthModule, WishlistModule, OrdersModule, CheckoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
