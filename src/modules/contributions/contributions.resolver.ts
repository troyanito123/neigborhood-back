import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContributionsService } from './contributions.service';
import { Contribution } from './entities/contribution.entity';
import { CreateContributionInput } from './dto/create-contribution.input';
import { UpdateContributionInput } from './dto/update-contribution.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleOptions, Roles } from '../auth/roles.decorator';

@Resolver(() => Contribution)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContributionsResolver {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Mutation(() => Contribution)
  @Roles(RoleOptions.ADMIN)
  createContribution(
    @Args('createContributionInput')
    createContributionInput: CreateContributionInput,
  ) {
    return this.contributionsService.create(createContributionInput);
  }

  @Query(() => [Contribution], { name: 'contributions' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  findAll() {
    return this.contributionsService.findAll();
  }

  @Query(() => Contribution, { name: 'contribution' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contributionsService.findOne(id);
  }

  @Mutation(() => Contribution)
  @Roles(RoleOptions.ADMIN)
  updateContribution(
    @Args('updateContributionInput')
    updateContributionInput: UpdateContributionInput,
  ) {
    return this.contributionsService.update(
      updateContributionInput.id,
      updateContributionInput,
    );
  }
}
