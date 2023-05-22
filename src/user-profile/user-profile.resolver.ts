import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserProfile } from './entity/user-profile.entity';
import { GqlAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Query(() => [UserProfile])
  async getAllUserProfiles() {
    return [];
  }

  //   @UseGuards(GqlAuthGuard)
  //   @Mutation(() => UserProfile)
  //   async createUserProfile(
  //     @CurrentUser() user: IJwtPayload,
  //     @Args('createUserProfileInput') createUserProfileDto: CreateUserProfileDto
  //   ) {
  //     return this.userProfileService.createUserProfile(user, createUserProfileDto);
  //   }
}
