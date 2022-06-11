import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MonthlyChargesPaidService } from './monthly-charges-paid.service';
import { MonthlyChargesPaid } from './entities/monthly-charges-paid.entity';
import { CreateMonthlyChargesPaidInput } from './dto/create-monthly-charges-paid.input';
import { User } from '../users/entities/user.entity';
import { MonthlyCharge } from '../monthly-charges/entities/monthly-charge.entity';

@Resolver(() => MonthlyChargesPaid)
export class MonthlyChargesPaidResolver {
  constructor(
    private readonly monthlyChargesPaidService: MonthlyChargesPaidService,
  ) {}

  @Mutation(() => MonthlyChargesPaid)
  createMonthlyChargesPaid(
    @Args('createMonthlyChargesPaidInput')
    createMonthlyChargesPaidInput: CreateMonthlyChargesPaidInput,
  ) {
    return this.monthlyChargesPaidService.create(createMonthlyChargesPaidInput);
  }

  @Query(() => [MonthlyChargesPaid], { name: 'monthlyChargesPaids' })
  findAll() {
    return this.monthlyChargesPaidService.findAll();
  }

  @Query(() => MonthlyChargesPaid, { name: 'monthlyChargesPaid' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.monthlyChargesPaidService.findOne(id);
  }

  @Mutation(() => MonthlyChargesPaid)
  removeMonthlyChargesPaid(@Args('id', { type: () => Int }) id: number) {
    return this.monthlyChargesPaidService.remove(id);
  }

  @Query(() => [MonthlyChargesPaid], { name: 'monthlyChargesPaidByUser' })
  findAllByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.monthlyChargesPaidService.findAllByUser(userId);
  }

  /* Resolvers for user and monthlyCharge */

  @ResolveField((returns) => User)
  user(@Parent() monthlyChargesPaid: MonthlyChargesPaid) {
    return this.monthlyChargesPaidService.getUser(monthlyChargesPaid.userId);
  }

  @ResolveField(() => MonthlyCharge)
  monthlyCharge(@Parent() monthlyChargePaid: MonthlyChargesPaid) {
    return this.monthlyChargesPaidService.getMonthlyCharge(
      monthlyChargePaid.monthlyChargeId,
    );
  }
}
