import { Module } from '@nestjs/common';
import { UserProfileResolver } from './user-profile.resolver';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './entity/user-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfileResolver, UserProfileService],
  exports: [TypeOrmModule.forFeature([UserProfile]), UserProfileService]
})
export class UserProfileModule {}
