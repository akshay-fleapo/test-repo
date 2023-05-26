import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

export enum EFulfillmentStatus {
  CREATED = 'created',
  SHIPPED = 'shipped',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  ATTEMPTED_DELIVERY = 'attempted_delivery',
  DELIVERED = 'delivered',
  FAILURE = 'failure'
}

registerEnumType(EFulfillmentStatus, {
  name: 'EFulfillmentStatus'
});

@Entity('fulfillments')
@ObjectType()
export class Fulfillments {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    type: 'enum',
    enum: EFulfillmentStatus,
    default: EFulfillmentStatus.CREATED
  })
  @Field(() => EFulfillmentStatus)
  status: EFulfillmentStatus;

  @Column({ type: 'timestamp', default: () => 'now()' })
  @Field(() => Date)
  createdAt: Date;

  // ONE TO ONE RELATIONSHIP WITH ORDERS

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  @Index()
  @Field(() => Order)
  order: Relation<Order>;
}
