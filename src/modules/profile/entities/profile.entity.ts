import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'proflie' })
@ObjectType()
export class Profile extends GenericEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  name: String;

  @Column({ nullable: true })
  @Field({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  identificationNumer: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  block: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  field: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  nus: string;

  @Column()
  @Field((type) => Int)
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  @Field((type) => User)
  user: User;
}
