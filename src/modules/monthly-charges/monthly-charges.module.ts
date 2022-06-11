import { Module } from '@nestjs/common';
import { MonthlyChargesService } from './monthly-charges.service';
import { MonthlyChargesResolver } from './monthly-charges.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyCharge } from './entities/monthly-charge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyCharge])],
  exports: [MonthlyChargesService],
  providers: [MonthlyChargesResolver, MonthlyChargesService],
})
export class MonthlyChargesModule {}
