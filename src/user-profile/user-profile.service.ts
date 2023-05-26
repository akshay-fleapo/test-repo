import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entity/user-profile.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
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

  async createUserProfile(user: IJwtPayload, createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    const foundUser = await this.userProfileRepository.findOne({
      where: { user: { id: user.id }, isDeleted: false }
    });
    if (foundUser) throw new NotFoundException('User profile already exists');

    const userProfile = await this.userProfileRepository.create({
      ...createUserProfileDto,
      user: { id: user.id }
    });
    return await this.userProfileRepository.save(userProfile);
  }

  async updateUserProfile(user: IJwtPayload, updateUserProfileDto: UpdateUserProfileDto) {
    const updatedUser = await this.userProfileRepository.update(
      { user: { id: user.id }, isDeleted: false },
      { ...updateUserProfileDto }
    );
    if (!updatedUser) throw new NotFoundException('User profile not found');
    return updatedUser;
  }

  async deleteUserProfile(user: IJwtPayload) {
    const foundUser = await this.userProfileRepository.findOne({
      where: { user: { id: user.id }, isDeleted: false }
    });
    if (!foundUser) throw new NotFoundException('User profile not found');
    return await this.userProfileRepository.save({ ...foundUser, isDeleted: true });
  }
}
