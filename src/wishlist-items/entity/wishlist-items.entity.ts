import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entity/product.entity';
import { Wishlist } from 'src/wishlist/entity/wishlist.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity('wishlist_items')
@ObjectType()
export class WishlistItems {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ default: false, name: 'is_featured' })
  @Field(() => Boolean)
  isFeatured: boolean;

  // MANY TO ONE RELATIONSHIP WITH WISHLIST

  @ManyToOne(() => Wishlist)
  @JoinColumn({ name: 'wishlist_id' })
  @Field(() => Wishlist)
  @Index()
  wishlist: Relation<Wishlist>;

  // ONE TO ONE RELATIONSHIP WITH PRODUCT

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  @Index()
  @Field(() => Product)
  product: Relation<Product>;
}
