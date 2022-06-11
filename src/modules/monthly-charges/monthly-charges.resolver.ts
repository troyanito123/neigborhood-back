import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MonthlyChargesService } from './monthly-charges.service';
import { MonthlyCharge } from './entities/monthly-charge.entity';
import { CreateMonthlyChargeInput } from './dto/create-monthly-charge.input';
import { UpdateMonthlyChargeInput } from './dto/update-monthly-charge.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleOptions, Roles } from '../auth/roles.decorator';

@Resolver(() => MonthlyCharge)
@UseGuards(JwtAuthGuard, RolesGuard)
export class MonthlyChargesResolver {
  constructor(private readonly monthlyChargesService: MonthlyChargesService) {}

  @Mutation(() => MonthlyCharge)
  @Roles(RoleOptions.ADMIN)
  createMonthlyCharge(
    @Args('createMonthlyChargeInput')
    createMonthlyChargeInput: CreateMonthlyChargeInput,
  ) {
    return this.monthlyChargesService.create(createMonthlyChargeInput);
  }

  @Query(() => [MonthlyCharge], { name: 'monthlyCharges' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  findAll() {
    return this.monthlyChargesService.findAll();
  }

  @Query(() => MonthlyCharge, { name: 'monthlyCharge' })
  @Roles(RoleOptions.ADMIN, RoleOptions.SUPERVISOR, RoleOptions.USER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.monthlyChargesService.findOne(id);
  }

  @Mutation(() => MonthlyCharge)
  @Roles(RoleOptions.ADMIN)
  updateMonthlyCharge(
    @Args('updateMonthlyChargeInput')
    updateMonthlyChargeInput: UpdateMonthlyChargeInput,
  ) {
    return this.monthlyChargesService.update(
      updateMonthlyChargeInput.id,
      updateMonthlyChargeInput,
    );
  }
}
