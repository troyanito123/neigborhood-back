import { Module } from '@nestjs/common';
import { ContributionsPaidService } from './contributions-paid.service';
import { ContributionsPaidResolver } from './contributions-paid.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionsPaid } from './entities/contributions-paid.entity';
import { ContributionsModule } from '../contributions/contributions.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContributionsPaid]),
    ContributionsModule,
    UsersModule,
  ],
  providers: [ContributionsPaidResolver, ContributionsPaidService],
})
export class ContributionsPaidModule {}
