import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { GenericStaus } from 'src/modules/generic-enums';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'meetings' })
@ObjectType()
export class Meeting extends GenericEntity {
  @Column()
  @Field()
  name: string;

  @Column({ type: 'text' })
  @Field()
  description: string;

  @Column()
  @Field()
  date: Date;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  conclutions: string;

  @Column()
  @Field((type) => Int)
  fine: number;

  @Column({ enum: GenericStaus, default: GenericStaus.ACTIVE })
  @Field()
  status: GenericStaus;
}
