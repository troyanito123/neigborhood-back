import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { User } from '../users/entities/user.entity';
import { Meeting } from '../meeting/entities/meeting.entity';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(() => Attendance)
  createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  ) {
    return this.attendanceService.create(createAttendanceInput);
  }

  @Query(() => [Attendance], { name: 'attendances' })
  findAll() {
    return this.attendanceService.findAll();
  }

  @Query(() => [Attendance], { name: 'attendancesByUser' })
  findAllByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.attendanceService.findAllByUser(userId);
  }

  @Query(() => Attendance, { name: 'attendance' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attendanceService.findOne(id);
  }

  @Mutation(() => Attendance)
  removeAttendance(@Args('id', { type: () => Int }) id: number) {
    return this.attendanceService.remove(id);
  }

  /* RESOLVER FIELD */

  @ResolveField(() => User)
  user(@Parent() attendance: Attendance) {
    return this.attendanceService.getUser(attendance.userId);
  }

  @ResolveField(() => Meeting)
  meeting(@Parent() attendance: Attendance) {
    return this.attendanceService.getMeeting(attendance.meetingId);
  }
}
