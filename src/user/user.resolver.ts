import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { GqlAuthGuard } from 'src/auth/guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUser(@CurrentUser() user: IJwtPayload) {
    return this.userService.getUser(user);
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(@CurrentUser() user: IJwtPayload, @Args('updateUserInput') updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(user, updateUserDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
