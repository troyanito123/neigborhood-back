import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsResolver } from './contributions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contribution } from './entities/contribution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contribution])],
  exports: [ContributionsService],
  providers: [ContributionsResolver, ContributionsService],
})
export class ContributionsModule {}
