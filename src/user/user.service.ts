import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserByPhoneDto as CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOneOrFail({
      where: {
        phone
      }
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  updateUser(createUserDto: Partial<CreateUserDto>) {
    const foundUser = this.getUserByPhone(createUserDto.phone);
    if (foundUser) return foundUser;

    const user = this.userRepository.create({
      ...createUserDto
    });

    try {
      this.userRepository.save(user);
    } catch (e) {
      console.log('throwing error');
      throw new Error('User already exists');
    }

    return user;
  }
}
