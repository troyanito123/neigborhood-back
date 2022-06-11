import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { MonthlyChargesPaid } from 'src/modules/monthly-charges-paid/entities/monthly-charges-paid.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'monthly_charges' })
@ObjectType()
export class MonthlyCharge extends GenericEntity {
  @Field((type) => Int)
  @Column()
  amount: number;

  @Column()
  @Field()
  month: string;

  @Column()
  @Field()
  year: string;

  @OneToMany(() => MonthlyChargesPaid, (mcp) => mcp.monthlyCharge, {
    cascade: true,
  })
  monthlyChargePaids: MonthlyChargesPaid[];
}
