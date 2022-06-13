import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Contribution } from 'src/modules/contributions/entities/contribution.entity';
import { GenericEntity } from 'src/modules/generic-entity';
import { GenericStaus } from 'src/modules/generic-enums';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'contributions_paid' })
@ObjectType()
export class ContributionsPaid extends GenericEntity {
  @Column()
  @Field()
  date: Date;

  @Column()
  @Field((type) => Int)
  amount: number;

  @Column({ enum: GenericStaus, default: GenericStaus.ACTIVE })
  @Field()
  status: GenericStaus;

  @Column()
  @Field((type) => Int)
  userId: number;

  @Column()
  @Field((type) => Int)
  contributionId: number;

  @ManyToOne(() => User, (user) => user.contributionsPaid)
  @Field((type) => User)
  user: User;

  @ManyToOne(
    () => Contribution,
    (contribution) => contribution.contributionsPaid,
  )
  @Field((type) => Contribution)
  contribution: Contribution;
}
