import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ContributionsPaid } from 'src/modules/contributions-paid/entities/contributions-paid.entity';
import { GenericEntity } from 'src/modules/generic-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'contributions' })
@ObjectType()
export class Contribution extends GenericEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field((type) => Int)
  amount: number;

  @Column({ default: false })
  @Field()
  special: boolean;

  @OneToMany(() => ContributionsPaid, (cp) => cp.contribution, {
    cascade: true,
  })
  contributionsPaid: ContributionsPaid[];
}
