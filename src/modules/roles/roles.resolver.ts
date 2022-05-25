import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RoleOptions, Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { User } from '../users/entities/user.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Resolver((of) => Role)
export class RolesResolver {
  constructor(private roleService: RolesService) {}

  @Query((returns) => [Role])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleOptions.ADMIN)
  roles(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Mutation((returns) => Role)
  createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('roleId', { type: () => Int }) roleId: number) {
    return this.roleService.findOne(roleId);
  }
}
