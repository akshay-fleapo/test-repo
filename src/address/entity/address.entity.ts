import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity('address')
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field()
  @Column({ name: 'address_line_1' })
  addressLine1: string;

  @Field()
  @Column({ name: 'address_line_2' })
  addressLine2: string;

  @Field()
  @Column({ name: 'city' })
  city: string;

  @Field()
  @Column({ name: 'state' })
  state: string;

  @Field()
  @Column({ name: 'country' })
  country: string;

  @Field()
  @Column({ name: 'zip_code' })
  zipCode: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'phone' })
  phone: string;

  @Field(() => Boolean)
  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @Field()
  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Field(() => Date)
  @Column({ default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  updatedAt: Date;

  @Column({ nullable: true, name: 'deleted_at' })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  // MANY TO ONE RELATIONSHIP WITH USER

  @ManyToOne(() => User, (user) => user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index()
  @Field(() => User)
  user: Relation<User>;
}
