import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { User } from '../users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleOptions, Roles } from '../auth/roles.decorator';

@Resolver(() => Profile)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR)
  findAll() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  findOne(@Args('userId', { type: () => Int }) userId: number) {
    return this.profileService.findOne(userId);
  }

  @Mutation(() => Profile)
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @ResolveField((returns) => User)
  user(@Parent() profile: Profile): Promise<User> {
    return this.profileService.getUser(profile.userId);
  }
}
