import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/roles.entity';
import { RolesService } from '../roles/roles.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}
  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    newUser.password = hashSync(createUserInput.password, 10);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getRole(roleId: number): Promise<Role> {
    return this.roleService.findOne(roleId);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
