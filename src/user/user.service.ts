import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(createUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOneBy({ phone });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async updateUser(createUserDto: Partial<CreateUserDto>) {
    const foundUser = await this.userRepository.findOneBy({ phone: createUserDto.phone });
    if (foundUser) return foundUser;
    const createdUser = await this.createUser(createUserDto);
    return createdUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) throw new NotFoundException('User not found.');
    return foundUser;
  }

  async deleteUser(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) throw new NotFoundException('User not found');
    await this.userRepository.delete({ id });
    return;
  }
}
