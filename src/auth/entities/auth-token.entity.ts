import { User } from 'src/user/entity/user.entity';
import { CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.authTokens, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: Relation<User>;

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;
}
