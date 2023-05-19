import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

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
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    // TODO : either add try/catch or use other method like->  findOneBy({id}) and throw NotFoundException
    return await this.userRepository.findOneByOrFail({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.create(createUserDto);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete({ id });
    return;
  }
}
