import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity('user_profile')
@ObjectType()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ name: 'first_name' })
  @Field()
  firstName: string;

  @Column({ name: 'last_name' })
  @Field()
  lastName: string;

  @Column({ name: 'avatar_url', default: null })
  @Field()
  avatarUrl: string;

  @Column({ name: 'page_name', default: null })
  @Field()
  pageName: string;

  @Column({ name: 'user_name' })
  @Field()
  @Index()
  userName: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: null })
  @Field()
  theme: string;

  @Column({ name: 'background_color', default: null })
  @Field()
  backgroundColor: string;

  @Column({ name: 'text_color', default: null })
  @Field()
  textColor: string;

  @Column({ name: 'background_image_url', default: null })
  @Field()
  backgroundImageUrl: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  updatedAt: Date;

  @Column({ nullable: true, name: 'deleted_at' })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @Column({ default: false, name: 'is_blocked' })
  @Field(() => Boolean, { defaultValue: false })
  isBlocked: boolean;

  @Column({ default: false, name: 'is_deleted' })
  @Field(() => Boolean, { defaultValue: false })
  isDeleted: boolean;

  // ONE-TO-ONE RELATIONSHIP WITH USER

  @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index()
  @Field(() => User)
  user: Relation<User>;
}
