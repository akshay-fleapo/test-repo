import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entity/product.entity';
import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity('order_items')
@ObjectType()
export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  // MANY TO ONE RELATIONSHIP WITH ORDER

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  @Field(() => Order)
  @Index()
  order: Relation<Order>;

  // ONE TO ONE RELATIONSHIP WITH PRODUCT

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  @Index()
  @Field(() => Product)
  product: Relation<Product>;

  @Field(() => Number)
  @Column()
  quantity: Number;

  @Field(() => Number)
  @Column()
  price: Number;

  @Field(() => Date)
  @Column({ default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  updatedAt: Date;
}
