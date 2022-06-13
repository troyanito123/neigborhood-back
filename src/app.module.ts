import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { DatabaseConfig } from './config/database.config';

import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './modules/profile/profile.module';
import { MonthlyChargesModule } from './modules/monthly-charges/monthly-charges.module';
import { MonthlyChargesPaidModule } from './modules/monthly-charges-paid/monthly-charges-paid.module';
import { ContributionsModule } from './modules/contributions/contributions.module';
import { ContributionsPaidModule } from './modules/contributions-paid/contributions-paid.module';
import { MeetingModule } from './modules/meeting/meeting.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    MonthlyChargesModule,
    MonthlyChargesPaidModule,
    ContributionsModule,
    ContributionsPaidModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
