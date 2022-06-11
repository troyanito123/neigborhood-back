import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { Column, Entity } from 'typeorm';

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
}
