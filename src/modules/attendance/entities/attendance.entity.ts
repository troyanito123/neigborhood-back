import { ObjectType, Field, Int } from '@nestjs/graphql';

import { GenericEntity } from 'src/modules/generic-entity';
import { GenericStaus } from 'src/modules/generic-enums';
import { Meeting } from 'src/modules/meeting/entities/meeting.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'attendances' })
@ObjectType()
export class Attendance extends GenericEntity {
  @Column({ enum: GenericStaus, default: GenericStaus.ACTIVE })
  @Field()
  status: GenericStaus;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field(() => Int)
  meetingId: number;

  @ManyToOne(() => User, (user) => user.attendances)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Meeting, (meeting) => meeting.attendances)
  @Field(() => Meeting)
  meeting: Meeting;
}
