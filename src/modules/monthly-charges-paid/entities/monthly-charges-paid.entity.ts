import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { GenericStaus } from 'src/modules/generic-enums';
import { MonthlyCharge } from 'src/modules/monthly-charges/entities/monthly-charge.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'monthly_charges_paid' })
@ObjectType()
export class MonthlyChargesPaid extends GenericEntity {
  @Column()
  @Field()
  date: Date;

  @Column()
  @Field()
  amount: number;

  @Column({ enum: GenericStaus, default: GenericStaus.ACTIVE })
  @Field()
  status: GenericStaus;

  @Column()
  @Field((type) => Int)
  userId: number;

  @Column()
  @Field((type) => Int)
  monthlyChargeId: number;

  @ManyToOne(() => User, (user) => user.monthlyChargePaids)
  @Field((type) => User)
  user: User;

  @ManyToOne(
    () => MonthlyCharge,
    (monthlyCharge) => monthlyCharge.monthlyChargePaids,
  )
  @Field((type) => MonthlyCharge)
  monthlyCharge: MonthlyCharge;
}
