import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Address } from "src/address/entity/address.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
export type order_status = "created" | "processing" | "completed" | "cencelled" | "refunded"
export type payment_status = "paid" | "unpaid"
export type order_type = "product_delivery" | "case_transfer"
export type gift_as = "user" | "anonymous"

@Entity('order')
@ObjectType()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => Number)
    total: number

    @Column()
    @Field(() => String)
    slug: string;


    @Column()
    @Field(() => String)
    url: string

    @Column({
        type: "enum",
        enum: ["created" , "processing" , "completed" , "cencelled" ,"refunded"],
        default: "processing"
    })
    status: order_status;

    @Column({
        type: "enum",
        enum: ["paid" ,"unpaid"],
        default: null
    })
    payment_status: payment_status;

    @Column()
    @Field(() => String)
    payment_method: String

    @Column()
    @Field(() => String)
    stripe_payment_id: String

    @Column({
        type: "enum",
        enum: ["product_delivery" , "case_transfer"],
    })
    order_type: order_type;

    @Column({
        type: "enum",
        enum: ["user" , "anonymous"],
    })
    gift_as: gift_as;

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

    // ONE-TO-ONE RELATIONSHIP WITH USER

    @OneToOne(() => User)
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