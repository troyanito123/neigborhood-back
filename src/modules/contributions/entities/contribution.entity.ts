import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { Column, Entity } from 'typeorm';

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
}
