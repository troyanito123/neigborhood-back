import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { Role } from 'src/modules/roles/roles.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { compareSync } from 'bcrypt';

@ObjectType()
@Entity({ name: 'users' })
export class User extends GenericEntity {
  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  displayName: string;

  @Column()
  password: string;

  @Column()
  @Field((type) => Int)
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @Field((type) => Role)
  role: Role;

  authenticate(password: string) {
    return compareSync(password, this.password);
  }
}
