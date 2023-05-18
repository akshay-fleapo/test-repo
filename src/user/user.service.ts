import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  createUser(createUserDto: Partial<CreateUserDto>) {
    const user = this.userRepository.create({
      ...createUserDto
    });
    this.userRepository.save(user);

    return user;
  }
}
