import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Role } from '../roles/roles.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleOptions, Roles } from '../auth/roles.decorator';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RoleOptions.ADMIN)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR)
  findAll(@Context() context) {
    // console.log(context.req.user);
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR)
  findOne(@Args('userId', { type: () => Int }) userId: number) {
    return this.usersService.findOne(userId);
  }

  @ResolveField((returns) => Role)
  role(@Parent() user: User): Promise<Role> {
    return this.usersService.getRole(user.roleId);
  }

  @Mutation(() => User)
  @Roles(RoleOptions.ADMIN)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @Roles(RoleOptions.ADMIN)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
