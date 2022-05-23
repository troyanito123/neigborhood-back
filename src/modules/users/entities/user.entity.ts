import { ObjectType, Field } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User extends GenericEntity {
  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  displayName: string;
}
