import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ContributionsPaidService } from './contributions-paid.service';
import { ContributionsPaid } from './entities/contributions-paid.entity';
import { CreateContributionsPaidInput } from './dto/create-contributions-paid.input';
import { User } from '../users/entities/user.entity';
import { Contribution } from '../contributions/entities/contribution.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleOptions, Roles } from '../auth/roles.decorator';
import { UpdateContributionsPaidInput } from './dto/update-contributions-paid.input';

@Resolver(() => ContributionsPaid)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContributionsPaidResolver {
  constructor(
    private readonly contributionsPaidService: ContributionsPaidService,
  ) {}

  @Mutation(() => ContributionsPaid)
  @Roles(RoleOptions.ADMIN)
  createContributionsPaid(
    @Args('createContributionsPaidInput')
    createContributionsPaidInput: CreateContributionsPaidInput,
  ) {
    return this.contributionsPaidService.create(createContributionsPaidInput);
  }

  @Query(() => [ContributionsPaid], { name: 'contributionsPaid' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR)
  findAll() {
    return this.contributionsPaidService.findAll();
  }

  @Query(() => [ContributionsPaid], { name: 'contributionsPaidByUser' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  findAllByUser(@Args('userId', { type: () => Int }) id: number) {
    return this.contributionsPaidService.findAllByUser(id);
  }

  @Query(() => ContributionsPaid, { name: 'contributionPaid' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contributionsPaidService.findOne(id);
  }

  @Mutation(() => ContributionsPaid)
  @Roles(RoleOptions.ADMIN)
  updateContributionsPaid(
    @Args('updateContributionsPaidInput')
    updateContributionsPaidInput: UpdateContributionsPaidInput,
  ) {
    return this.contributionsPaidService.update(
      updateContributionsPaidInput.id,
      updateContributionsPaidInput,
    );
  }

  @Mutation(() => ContributionsPaid)
  @Roles(RoleOptions.ADMIN)
  removeContributionsPaid(@Args('id', { type: () => Int }) id: number) {
    return this.contributionsPaidService.remove(id);
  }

  /* RESOLVED FIELDS */

  @ResolveField(() => User)
  user(@Parent() contributionPaid: ContributionsPaid) {
    return this.contributionsPaidService.getUser(contributionPaid.userId);
  }

  @ResolveField(() => Contribution)
  contribution(@Parent() contributionPaid: ContributionsPaid) {
    return this.contributionsPaidService.getContribution(
      contributionPaid.contributionId,
    );
  }
}
