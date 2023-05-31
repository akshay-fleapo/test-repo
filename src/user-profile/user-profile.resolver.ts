import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserProfile } from './entity/user-profile.entity';
import { GqlAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { UserProfileService } from './user-profile.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserProfile)
  async getUserProfile(@CurrentUser() user: IJwtPayload) {
    return this.userProfileService.getUserProfile(user);
  }

  @Query(() => UserProfile)
  async getUserProfileByUserId(@Args('userId') userId: string) {
    return this.userProfileService.getUserProfileByUserId(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserProfile)
  async updateUserProfile(
    @CurrentUser() user: IJwtPayload,
    @Args('updateUserProfileInput') updateUserProfileDto: UpdateUserProfileDto
  ) {
    return this.userProfileService.updateUserProfile(user, updateUserProfileDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserProfile)
  async deleteUserProfile(@CurrentUser() user: IJwtPayload) {
    return this.userProfileService.deleteUserProfile(user);
  }
}
