import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    const newRole = this.roleRepository.create(createRoleInput);
    return this.roleRepository.save(newRole);
  }
  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['users'] });
  }

  findOne(roleId: number): Promise<Role> {
    return this.roleRepository.findOneOrFail(roleId);
  }
}
