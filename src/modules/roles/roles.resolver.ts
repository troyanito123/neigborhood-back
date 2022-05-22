import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Resolver((of) => Role)
export class RolesResolver {
  constructor(private roleService: RolesService) {}

  @Query((returns) => [Role])
  roles(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Mutation((returns) => Role)
  createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.create(createRoleInput);
  }
}
