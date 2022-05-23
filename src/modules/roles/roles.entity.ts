import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generic-entity';

@Entity({ name: 'roles' })
@ObjectType()
export class Role extends GenericEntity {
  @Column()
  @Field()
  displayName: string;

  @Column({ unique: true })
  @Field()
  code: string;
}
