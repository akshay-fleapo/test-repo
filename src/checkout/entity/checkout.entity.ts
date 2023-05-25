import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/entity/product.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';


@Entity('checkout')
@ObjectType()
export class Checkout {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // MANY TO ONE RELATIONSHIP WITH USER

    @ManyToOne(() => User)
    @JoinColumn({ name: 'creator_id' })
    @Index()
    @Field(() => User)
    creator: Relation<User>;

    // ONE-TO-ONE RELATIONSHIP WITH USER

    @OneToOne(() => User)
    @JoinColumn({ name: 'gifter_id' })
    @Index()
    @Field(() => User)
    gifter: Relation<User>;

    // ONE TO ONE RELATIONSHIP WITH PRODUCT

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    @Index()
    @Field(() => Product)
    product: Relation<Product>;

    @Column()
    @Field(() => Number)
    total: number;

    @Column({ default: () => 'now()', name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;
}