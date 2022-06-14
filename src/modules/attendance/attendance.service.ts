import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericStaus } from '../generic-enums';
import { MeetingService } from '../meeting/meeting.service';
import { UsersService } from '../users/users.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    private userService: UsersService,
    private meetingService: MeetingService,
  ) {}

  create(createAttendanceInput: CreateAttendanceInput) {
    return this.attendanceRepository.save(createAttendanceInput);
  }

  findAll() {
    return this.attendanceRepository.find();
  }

  findAllByUser(userId: number) {
    return this.attendanceRepository.find({
      where: { userId, status: GenericStaus.ACTIVE },
    });
  }

  findOne(id: number) {
    return this.attendanceRepository.findOneOrFail(id);
  }

  async remove(id: number) {
    const attendance = await this.attendanceRepository.findOneOrFail(id);
    attendance.status = GenericStaus.DELETED;
    return this.attendanceRepository.save(attendance);
  }

  /* FIELDS RESOLVERS */

  getUser(userId: number) {
    return this.userService.findOne(userId);
  }

  getMeeting(meetingId: number) {
    return this.meetingService.findOne(meetingId);
  }
}
