import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { IJwtPayload } from 'src/auth/dto/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({ where: { isDeleted: false } });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id, isDeleted: false });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async getUserByPhone(phone: string) {
    const foundUser = await this.userRepository.findOneBy({ phone, isDeleted: false });
    return await this.userRepository.save({ ...foundUser, isPhoneVerified: true });
  }

  // thi API will call in every page for validate the token and extract the user info from token
  async getUser(user: IJwtPayload) {
    const foundUser = await this.userRepository.findOne({
      select: ['id', 'firstName', 'lastName', 'email', 'isAdmin', 'isProfileCompleted'],
      where: { id: user.id, isDeleted: false }
    });
    if (!foundUser) throw new NotFoundException('User not found.');
    return foundUser;
  }

  async createUser(createUserDto: CreateUserDto) {
    const foundUser = await this.userRepository.findOneBy({ phone: createUserDto.phone });
    if (foundUser) {
      if (foundUser.isDeleted) {
        const deletedUser = await this.userRepository.update({ id: foundUser.id }, { isDeleted: false });
        return deletedUser;
      } else {
        return foundUser;
      }
    }
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(user: IJwtPayload, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.update({ id: user.id, isDeleted: false }, { ...updateUserDto });
    if (!updateUser) throw new NotFoundException('User not found.');
    return updateUser;
  }

  async deleteUser(id: string) {
    const foundUser = await this.userRepository.findOneBy({ id, isDeleted: false });
    if (!foundUser) throw new NotFoundException('User not found');
    return await this.userRepository.save({ ...foundUser, isDeleted: true });
  }
}
