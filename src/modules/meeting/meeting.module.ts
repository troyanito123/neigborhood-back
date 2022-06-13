import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingResolver } from './meeting.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingResolver, MeetingService],
})
export class MeetingModule {}
