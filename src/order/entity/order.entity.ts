import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/address/entity/address.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
export enum order_status {
  created = 'created',
  processing = 'processing',
  completed = 'completed',
  cencelled = 'cencelled',
  refunded = 'refunded'
}
export enum payment_status {
  paid = 'paid',
  unpaid = 'unpaid'
}
export enum order_type {
  product_delivery = 'product_delivery',
  case_transfer = 'case_transfer'
}
export enum gift_as {
  user = 'user',
  anonymous = 'anonymous'
}

@Entity('order')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Number)
  total: number;

  @Column()
  @Field(() => String)
  slug: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column({
    type: 'enum',
    enum: order_status,
    default: order_status.processing
  })
  status: order_status;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: payment_status,
    default: payment_status.unpaid
  })
  paymentStatus: payment_status;

  @Column({ name: 'payment_method' })
  @Field(() => String)
  paymentMethod: String;

  @Column({ name: 'stripe_payment_id' })
  @Field(() => String)
  stripePaymentId: String;

  @Column({
    name: 'order_type',
    type: 'enum',
    enum: order_type
  })
  orderType: order_type;

  @Column({
    name: 'gift_as',
    type: 'enum',
    enum: gift_as,
    default: gift_as.anonymous
  })
  giftAs: gift_as;

  @Column({ default: () => 'now()', name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @Column({ default: false, name: 'is_deleted' })
  @Field(() => Boolean)
  isDeleted: boolean;

  @Column({ default: true, name: 'is_active' })
  @Field(() => Boolean)
  isActive: boolean;

  // MANY TO ONE RELATIONSHIP WITH USER

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  @Index()
  @Field(() => User)
  creator: Relation<User>;

  // Many-TO-ONE RELATIONSHIP WITH USER

  @ManyToOne(() => User)
  @JoinColumn({ name: 'gifter_id' })
  @Index()
  @Field(() => User)
  gifter: Relation<User>;

  // ONE-TO-ONE RELATIONSHIP WITH ADDRESS

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  @Index()
  @Field(() => Address)
  address: Relation<Address>;
}
