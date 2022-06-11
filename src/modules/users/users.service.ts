import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/roles.entity';
import { RolesService } from '../roles/roles.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

import { hashSync } from 'bcrypt';
import { RoleOptions } from '../auth/roles.decorator';
import { GenericStaus } from '../generic-enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    newUser.password = hashSync(createUserInput.password, 10);
    if (!createUserInput.roleId) {
      const role = await this.roleService.findOneByCode(RoleOptions.USER);
      newUser.role = role;
      newUser.roleId = role.id;
    }
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOne(id);
    const { id: userId, ...rest } = updateUserInput;
    this.userRepository.merge(user, rest);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    user.status = GenericStaus.DELETED;
    return this.userRepository.save(user);
  }

  getRole(roleId: number): Promise<Role> {
    return this.roleService.findOne(roleId);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email, status: GenericStaus.ACTIVE },
      relations: ['role'],
    });
  }
}
