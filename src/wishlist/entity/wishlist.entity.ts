import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/address/entity/address.entity';
import { User } from 'src/user/entity/user.entity';
import { WishlistItems } from 'src/wishlist-items/entity/wishlist-items.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from 'typeorm';

@Entity('wishlist')
@ObjectType()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

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

  @Column({ name: 'banner_image_url' })
  @Field(() => String)
  bannerImageUrl: string;

  @Column({ default: true, name: 'is_active' })
  @Field(() => Boolean)
  isActive: boolean;

  @Column()
  @Field(() => String)
  slug: string;

  // ONE TO ONE RELATIONSHIP WITH ADDRESS

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  @Index()
  @Field(() => Address)
  address: Relation<Address>;

  // MANY TO ONE RELATIONSHIP WITH USER

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Index()
  @Field(() => User)
  user: Relation<User>;

  // ONE TO MANY RELATIONSHIP WITH WISHLIST ITEMS

  @OneToMany(() => WishlistItems, ({ wishlist }) => wishlist)
  @Field(() => [WishlistItems])
  wishlistItems: Relation<WishlistItems[]>;
}
