import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ default: () => 'now()' })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;

  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @Field()
  @Column({ default: false })
  isBlocked: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  isDeleted: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  blockedTimeout: Date;

  @Field({ nullable: true })
  @Column({ default: false })
  isProfileCompleted: boolean;

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Field()
  @Column({ default: false })
  isPhoneVerified: boolean;

  @Field()
  @Column({ default: false })
  isVerified: boolean;
}
