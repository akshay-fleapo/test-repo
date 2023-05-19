import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AuthToken } from 'src/auth/entities/auth-token.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'first_name' })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'last_name' })
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

  @Field(() => Date)
  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Date)
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Field()
  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean;

  @Field()
  @Column({ default: false, name: 'is_blocked' })
  isBlocked: boolean;

  @Field(() => Boolean)
  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, name: 'blocked_timeout' })
  blockedTimeout: Date;

  @Field(() => Boolean)
  @Column({ default: false, name: 'is_profile_completed' })
  isProfileCompleted: boolean;

  @Field(() => Boolean)
  @Column({ default: false, name: 'is_email_verified' })
  isEmailVerified: boolean;

  @Field(() => Boolean)
  @Column({ default: false, name: 'is_phone_verified' })
  isPhoneVerified: boolean;

  @Field(() => Boolean)
  @Column({ default: false, name: 'is_verified' })
  isVerified: boolean;

  @OneToMany(() => AuthToken, ({ user }) => user)
  authTokens: AuthToken[];
}
