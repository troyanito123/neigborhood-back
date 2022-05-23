import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { GenericEntity } from '../generic-entity';
import { User } from '../users/entities/user.entity';

@Entity({ name: 'roles' })
@ObjectType()
export class Role extends GenericEntity {
  @Column()
  @Field()
  displayName: string;

  @Column({ unique: true })
  @Field()
  code: string;

  @OneToMany(() => User, (user) => user.role)
  @Field((type) => [User], { nullable: true })
  users?: User[];
}
