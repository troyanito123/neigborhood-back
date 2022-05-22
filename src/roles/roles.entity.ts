import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  displayName: string;

  @Column({ unique: true })
  @Field()
  code: string;

  @CreateDateColumn()
  @Field()
  createAt: Date;

  @UpdateDateColumn()
  @Field()
  updateAt: Date;
}
