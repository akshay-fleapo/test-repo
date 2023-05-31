import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entity/user-profile.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>
  ) {}

  async getUserProfile(user: IJwtPayload) {
    console.log('user---', user);
    const foundUser = await this.userProfileRepository.findOne({
      where: { user: { id: user.id }, isDeleted: false },
      relations: ['user']
    });
    if (!foundUser) throw new NotFoundException('User profile not found');
    return foundUser;
  }

  async getUserProfileByUserId(userId: string) {
    const foundUser = await this.userProfileRepository.findOne({
      where: { user: { id: userId }, isDeleted: false },
      relations: ['user']
    });
    if (!foundUser) throw new NotFoundException('User profile not found');
    return foundUser;
  }

  async createUserProfile(userId: string) {
    const foundUser = await this.userProfileRepository.findOne({
      where: { user: { id: userId }, isDeleted: false }
    });
    if (foundUser) return;

    const userProfile = await this.userProfileRepository.create({
      user: { id: userId }
    });
    return await this.userProfileRepository.save(userProfile);
  }

  async updateUserProfile(user: IJwtPayload, updateUserProfileDto: UpdateUserProfileDto) {
    const foundUser = await this.userProfileRepository.findOne({
      where: { user: { id: user.id }, isDeleted: false }
    });
    if (!foundUser) throw new NotFoundException('User profile not found');
    return await this.userProfileRepository.save({ ...foundUser, ...updateUserProfileDto });
  }

  async deleteUserProfile(user: IJwtPayload) {
    const foundUser = await this.userProfileRepository.findOne({
      where: { user: { id: user.id }, isDeleted: false }
    });
    if (!foundUser) throw new NotFoundException('User profile not found');
    return await this.userProfileRepository.save({ ...foundUser, isDeleted: true });
  }
}
