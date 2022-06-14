import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { UsersModule } from '../users/users.module';
import { MeetingModule } from '../meeting/meeting.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), UsersModule, MeetingModule],
  providers: [AttendanceResolver, AttendanceService],
})
export class AttendanceModule {}
