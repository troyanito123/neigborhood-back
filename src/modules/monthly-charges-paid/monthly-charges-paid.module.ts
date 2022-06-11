import { Module } from '@nestjs/common';
import { MonthlyChargesPaidService } from './monthly-charges-paid.service';
import { MonthlyChargesPaidResolver } from './monthly-charges-paid.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyChargesPaid } from './entities/monthly-charges-paid.entity';
import { UsersModule } from '../users/users.module';
import { MonthlyChargesModule } from '../monthly-charges/monthly-charges.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonthlyChargesPaid]),
    UsersModule,
    MonthlyChargesModule,
  ],
  providers: [MonthlyChargesPaidResolver, MonthlyChargesPaidService],
})
export class MonthlyChargesPaidModule {}
