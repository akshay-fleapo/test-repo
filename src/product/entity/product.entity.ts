import { Field, ID, ObjectType } from '@nestjs/graphql';
import { WishlistItems } from 'src/wishlist-items/entity/wishlist-items.entity';
import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity('product')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ name: 'image_url', default: null })
  @Field(() => String)
  imageUrl: string;

  @Column()
  @Field(() => Number)
  price: number;

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

  @Column()
  @Field(() => String)
  @Index({ unique: true })
  slug: string;

  @Column()
  @Field(() => String)
  url: string;

  // TODO : Ask this

  @Column({ name: 'convictional_product_id', nullable: true })
  @Field(() => String)
  convictionalProductId: string;

  // ONE TO ONE RELATIONSHIP WITH WIHSILIST ITEMS

  @OneToOne(() => WishlistItems, ({ product }) => product)
  wishlistItems: Relation<WishlistItems>;
}
