import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericStaus } from '../generic-enums';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting) private meetingRespository: Repository<Meeting>,
  ) {}

  create(createMeetingInput: CreateMeetingInput) {
    return this.meetingRespository.save(createMeetingInput);
  }

  findAll() {
    return this.meetingRespository.find();
  }

  findOne(id: number) {
    return this.meetingRespository.findOneOrFail(id);
  }

  async update(id: number, updateMeetingInput: UpdateMeetingInput) {
    const meeting = await this.meetingRespository.findOneOrFail(id);
    const { id: other, ...rest } = updateMeetingInput;
    this.meetingRespository.merge(meeting, rest);
    return this.meetingRespository.save(meeting);
  }

  async remove(id: number) {
    const meeting = await this.meetingRespository.findOneOrFail(id);
    meeting.status = GenericStaus.DELETED;
    return this.meetingRespository.save(meeting);
  }
}
