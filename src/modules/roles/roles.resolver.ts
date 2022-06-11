import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RoleOptions, Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Resolver((of) => Role)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesResolver {
  constructor(private roleService: RolesService) {}

  @Query((returns) => [Role])
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR)
  roles(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Mutation((returns) => Role)
  @Roles(RoleOptions.ADMIN)
  createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => Role, { name: 'role' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR)
  findOne(@Args('roleId', { type: () => Int }) roleId: number) {
    return this.roleService.findOne(roleId);
  }
}
